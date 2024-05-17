import { useState } from "react";
import MLBtoESPNID from "../MLBtoESPNID.json";
import allMLBPlayers from "../allMLBPlayers.json";
import players from "../answerList.json";
import specialCases from "../specialCases.json";

// Converts full team name to abbreviation
function teamAbbreviator(fullName) {
  const teamMap = new Map([
    ["New York Yankees", "NYY"],
    ["Boston Red Sox", "BOS"],
    ["Tampa Bay Rays", "TB"],
    ["Tampa Bay Devil Rays", "TB"],
    ["Baltimore Orioles", "BAL"],
    ["Toronto Blue Jays", "TOR"],
    ["Kansas City Royals", "KC"],
    ["Chicago White Sox", "CWS"],
    ["Minnesota Twins", "MIN"],
    ["Cleveland Guardians", "CLE"],
    ["Cleveland Indians", "CLE"],
    ["Detroit Tigers", "DET"],
    ["Houston Astros", "HOU"],
    ["Los Angeles Angels", "LAA"],
    ["Texas Rangers", "TEX"],
    ["Seattle Mariners", "SEA"],
    ["Oakland Athletics", "OAK"],
    ["Atlanta Braves", "ATL"],
    ["Philadelphia Phillies", "PHI"],
    ["Miami Marlins", "MIA"],
    ["Florida Marlins", "FLA"],
    ["New York Mets", "NYM"],
    ["Washington Nationals", "WAS"],
    ["Milwaukee Brewers", "MIL"],
    ["Chicago Cubs", "CHC"],
    ["Cincinnati Reds", "CIN"],
    ["Pittsburgh Pirates", "PIT"],
    ["St. Louis Cardinals", "STL"],
    ["Los Angeles Dodgers", "LAD"],
    ["Arizona Diamondbacks", "ARI"],
    ["San Diego Padres", "SD"],
    ["San Francisco Giants", "SF"],
    ["Colorado Rockies", "COL"],
    ["Multiple", "MULT"],
  ]);
  if (teamMap.get(fullName)) {
    return teamMap.get(fullName);
  } else {
    return "Total";
  }
}

function randomPlayerGenerator() {
  let randomPlayer = allMLBPlayers[
    Math.floor(Math.floor(Math.random() * allMLBPlayers.length))
  ]
    .replace("í", "i")
    .replace("í", "i")
    .replace("é", "e")
    .replace("é", "e")
    .replace("á", "a")
    .replace("ó", "o")
    .replace("ú", "u");

  return randomPlayer;
}

function dailyPlayerGenerator() {
  const startDate = new Date("May 16, 2024");
  const curDate = new Date();
  const difference = Math.floor(
    (curDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );
  let dailyPlayer = players[difference];
  return dailyPlayer;
}

// Gets the player's information and year, returns all players from that year
async function fetchData(playerName) {
  let suffixSet = new Set(["Jr.", "Sr.", "II", "III", "IV", "V"]);

  // Sets last name, handles players with more than 2 names (Jr., II, Jung Ho Kang, etc.)
  let lastName = "";
  if (suffixSet.has(playerName.split(" ").slice(-1)[0])) {
    lastName = playerName.split(" ")[1];
  } else {
    lastName = playerName.split(" ").slice(-1)[0];
  }

  async function getPlayer() {
    let response2 = await fetch(
      "https://statsapi.mlb.com/api/v1/people/search?names=" + lastName
    );
    let data2 = await response2.json().then((res) => {
      let id = "";
      // Special handling for Will Smith (catcher) so that Will Smith (pitcher) is not returned
      if (playerName == "Will Smith") {
        return 669257;
      }
      for (let i = 0; i < res.people.length; i++) {
        if (
          res.people[i].fullName
            .replace("í", "i")
            .replace("í", "i")
            .replace("é", "e")
            .replace("é", "e")
            .replace("á", "a")
            .replace("ó", "o")
            .replace("ú", "u")
            .replace("ñ", "n") == playerName
        ) {
          id = res.people[i].id;
          return id;
        }
      }
    });

    // actually returning id above, this just makes it wait til data2 resolves
    return data2;
  }

  let MLBId;
  if (playerName in specialCases) {
    MLBId = specialCases[playerName];
  } else {
    MLBId = await getPlayer();
  }

  let ESPNId = MLBtoESPNID[MLBId];
  let headshot = await getHeadshot(ESPNId);

  // Gets a player's information from their MLB ID
  async function getPlayerInfo() {
    let response = await fetch(
      "https://statsapi.mlb.com/api/v1/people?personIds=" +
        MLBId +
        "&hydrate=stats(group=[batting],type=[yearByYear])"
    );
    let data = await response.json();
    return data.people[0];
  }

  let playerStats = await getPlayerInfo();

  // Gets a player's headshot from their ESPN ID
  async function getHeadshot(ESPNId) {
    let playerPic = "";

    playerPic =
      "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/" +
      ESPNId +
      ".png&w=350&h=254";
    return playerPic;
  }

  return [
    playerStats.stats[0].splits,
    headshot,
    playerStats.stats[0].group.displayName,
  ];
}

const getFormattedDate = (offset = 0) => {
  const t = new Date(Date.now());
  t.setHours(t.getHours() + offset * 24);
  const z = t.getTimezoneOffset() * 60 * 1000;
  let tLocal = t - z;
  tLocal = new Date(tLocal);
  const iso = tLocal.toISOString().split("T")[0];
  return iso;
};

// const tester = () => {
//   for (let i = 0; i < allMLBPlayers.length; i++) {
//     fetchData(allMLBPlayers[i]).then((res) => {
//     });
//   }
// };

// allPlayers = {}

export {
  randomPlayerGenerator,
  teamAbbreviator,
  fetchData,
  players,
  dailyPlayerGenerator,
  getFormattedDate,
};
