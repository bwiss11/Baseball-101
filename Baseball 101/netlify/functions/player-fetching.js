import players from "../../src/answerList.json";
import specialCases from "../../src/specialCases.json";
import MLBtoESPNID from "../../src/MLBtoESPNID.json";
import AWS from "aws-sdk";
import { Buffer } from "buffer";

const s3 = new AWS.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: process.env.MY_AWS_REGION,
});

async function getCachedData(date) {
  try {
    const params = {
      Bucket: "baseball101bucket",
      Key: `cache/${date}.json`,
    };
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
  } catch (error) {
    return null;
  }
}

async function setCachedData(date, data) {
  const params = {
    Bucket: "baseball101bucket",
    Key: `cache/${date}.json`,
    Body: JSON.stringify(data),
    ContentType: "application/json",
  };
  await s3.putObject(params).promise();
}

export const handler = async (event) => {
  // / AWS Section
  async function uploadImageToS3(url, filename) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const params = {
      Bucket: "baseball101bucket",
      Key: filename,
      Body: buffer,
      ContentType: "image/png",
      //   ACL: 'public-read',
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  }

  //   // end AWS Section

  const today = event.queryStringParameters.date;
  const startString = "2025-02-14";
  const startDate = new Date(startString);
  const curDate = new Date(today);
  const difference = Math.floor((curDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

  console.log("difference is " + difference);
  let dailyPlayer = players[difference];

  // Try to get cached data first
  const cachedData = await getCachedData(today);
  if (cachedData) {
    console.log("returning cached data");
    return {
      statusCode: 200,
      body: JSON.stringify([cachedData[0], cachedData[1], cachedData[2], cachedData[3]]),
    };
  }

  async function fetchData(playerName) {
    let suffixSet = new Set(["Jr.", "Sr.", "II", "III", "IV", "V"]);
    let lastName = suffixSet.has(playerName.split(" ").slice(-1)[0])
      ? playerName.split(" ")[1]
      : playerName.split(" ").slice(-1)[0];

    async function getPlayer() {
      let response2 = await fetch("https://statsapi.mlb.com/api/v1/people/search?names=" + lastName);
      let data2 = await response2.json();
      let id = "";
      if (playerName == "Will Smith") {
        return 669257;
      }
      for (let i = 0; i < data2.people.length; i++) {
        if (data2.people[i].fullName.normalize("NFD").replace(/\p{Diacritic}/gu, "") == playerName) {
          id = data2.people[i].id;
          return id;
        }
      }
    }

    let MLBId = playerName in specialCases ? specialCases[playerName] : await getPlayer();
    let ESPNId = MLBtoESPNID[MLBId];
    let headshotURL = await getHeadshot(ESPNId);
    console.log("uploading image to S3");
    const AWSheadshoturl = await uploadImageToS3(headshotURL, `${playerName}.png`);
    console.log("headshottest is " + AWSheadshoturl);

    async function getPlayerInfo() {
      console.log("making request to MLB API");
      let response = await fetch(
        "https://statsapi.mlb.com/api/v1/people?personIds=" +
          MLBId +
          "&hydrate=stats(group=[batting],type=[yearByYear])"
      );
      let data = await response.json();
      return data.people[0];
    }

    let playerStats = await getPlayerInfo();

    async function getHeadshot(ESPNId) {
      console.log("making request to ESPN API");
      return "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/" + ESPNId + ".png&w=350&h=254";
    }
    return [playerStats.stats[0].splits, AWSheadshoturl, playerStats.stats[0].group.displayName, playerName];
  }

  let res = await fetchData(dailyPlayer);

  await setCachedData(today, res);

  return {
    statusCode: 200,
    body: JSON.stringify([res[0], res[1], res[2], res[3]]),
  };
};
