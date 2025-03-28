import fetch from 'node-fetch'; // Ensure you have node-fetch installed for server-side fetch
import  players  from '../../src/answerList.json'
import specialCases from '../../src/specialCases.json'
import MLBtoESPNID from '../../src/MLBtoESPNID.json'
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';

// Cache variables
let cachedData = null;
let cachedDate = null;

export const handler = async () => {


dotenv.config();
/// AWS Section
const s3 = new AWS.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    region: process.env.MY_AWS_REGION,
  });

  async function uploadImageToS3(url, filename) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const params = {
      Bucket: "baseball101bucket",
      Key: filename,
      Body: buffer,
      ContentType: 'image/png',
    //   ACL: 'public-read',
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  }

  // end AWS Section










    const startDate = new Date("February 14, 2025");
    const curDate = new Date();
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    console.log("cachedDate is " + cachedDate);
    console.log("curDate is " + today);
        // Check if we have cached data for today
        if (cachedDate === today && cachedData) {
            return {
              statusCode: 200,
              body: JSON.stringify([
                cachedData[0],
                cachedData[1],
                cachedData[2],
                cachedData[3],
              ]),
            
          }}

    const difference = Math.floor(
      (curDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    let dailyPlayer = players[difference];





    async function fetchData(playerName) {
        let suffixSet = new Set(["Jr.", "Sr.", "II", "III", "IV", "V"]);
        let lastName = suffixSet.has(playerName.split(" ").slice(-1)[0])
          ? playerName.split(" ")[1]
          : playerName.split(" ").slice(-1)[0];
      
        async function getPlayer() {
          let response2 = await fetch(
            "https://statsapi.mlb.com/api/v1/people/search?names=" + lastName
          );
          let data2 = await response2.json();
          let id = "";
          if (playerName == "Will Smith") {
            return 669257;
          }
          for (let i = 0; i < data2.people.length; i++) {
            if (
              data2.people[i].fullName
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "") == playerName
            ) {
              id = data2.people[i].id;
              return id;
            }
          }
        }
      
        let MLBId = playerName in specialCases ? specialCases[playerName] : await getPlayer();
        let ESPNId = MLBtoESPNID[MLBId];
        let headshotURL = await getHeadshot(ESPNId);
        console.log("uploading image to S3");
        const AWSheadshoturl = await uploadImageToS3(headshotURL, `didigregorius.png`);
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
          return "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/" +
            ESPNId +
            ".png&w=350&h=254";
        }
        return [
            playerStats.stats[0].splits,
            AWSheadshoturl,
            playerStats.stats[0].group.displayName,
            playerName,
          ];
      }

      let res = await fetchData(dailyPlayer);

      

      cachedData = res;
      cachedDate = today;
      return {
        statusCode: 200,
        body: JSON.stringify([
          res[0],
          res[1],
          res[2],
          res[3],
        ]),

      }

  }



  
