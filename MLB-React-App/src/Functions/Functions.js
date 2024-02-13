// Converts full team name to abbreviation
function teamAbbreviator(fullName) {
  const teamMap = new Map([
    ["New York Yankees", "NYY"],
    ["Boston Red Sox", "BOS"],
    ["Tampa Bay Rays", "TB"],
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
  const players = [
    "Ronald Acuna Jr.",
    "Mookie Betts",
    "Freddie Freeman",
    "Matt Olson",
    "Corey Seager",
    "Juan Soto",
    "Shohei Ohtani",
    "Julio Rodriguez",
    "Corbin Carroll",
    "Marcus Semien",
    "J.P. Crawford",
    "Francisco Lindor",
    "Kyle Tucker",
    "Yandy Diaz",
    "Jose Ramirez",
    "Austin Riley",
    "Bobby Witt Jr.",
    "Aaron Judge",
    "Xander Bogaerts",
    "Gunnar Henderson",
    "Ketel Marte",
    "Ozzie Albies",
    "Luis Arraez",
    "Yordan Alvarez",
    "Brandon Nimmo",
    "Trea Turner",
    "Adley Rutschman",
    "Bo Bichette",
    "Luis Robert Jr.",
    "Rafael Devers",
    "Alex Bregman",
    "Isaac Paredes",
    "William Contreras",
    "Ha-Seong Kim",
    "Cody Bellinger",
    "Jose Altuve",
    "Christian Yelich",
    "Wander Franco",
    "TJ Friedl",
    "Bryson Stott",
    "Nico Hoerner",
    "Bryce Harper",
    "Adolis Garcia",
    "Willson Contreras",
    "Cal Raleigh",
    "Brandon Marsh",
    "Spencer Steer",
    "Will Smith",
    "Marcell Ozuna",
    "Josh Lowe",
    "Paul Goldschmidt",
    "Manny Machado",
    "Mike Trout",
    "Nolan Arenado",
    "Andres Gimenez",
    "J.T. Realmuto",
    "Carlos Correa",
    "Jeff McNeil",
    "Dansby Swanson",
    "Pete Alonso",
    "George Springer",
    "Michael Harris II",
    "Nathaniel Lowe",
    "Tommy Edman",
    "Bryan Reynolds",
    "Jake Cronenworth",
    "Eugenio Suarez",
    "Jose Abreu",
    "Taylor Ward",
    "Steven Kwan",
    "Sean Murphy",
    "Amed Rosario",
    "Vladimir Guerrero Jr.",
    "Kyle Schwarber",
    "Alejandro Kirk",
    "Elvis Andrus",
    "Fernando Tatis Jr.",
    "Cedric Mullins",
    "Brandon Lowe",
    "Brandon Crawford",
    "Tyler O'Neill",
    "Starling Marte",
    "Jorge Polanco",
    "Salvador Perez",
    "Tim Anderson",
    "Max Muncy",
    "Buster Posey",
    "Ty France",
    "Willy Adames",
    "Jeimer Candelario",
    "Teoscar Hernandez",
    "Nick Castellanos",
    "Javier Baez",
    "Jonathan India",
    "Justin Turner",
    "Yasmani Grandal",
    "Mike Zunino",
    "Kris Bryant",
    "DJ LeMahieu",
    "Mike Yastrzemski",
    "Anthony Rendon",
    "Michael Conforto",
    "Dominic Smith",
    "Brandon Belt",
    "Cavan Biggio",
    "Luke Voit",
    "Wil Myers",
    "Ronald Acuna Jr.",
    "Trevor Story",
    "Nelson Cruz",
    "Donovan Solano",
    "Eloy Jimenez",
    "Kyle Lewis",
    "Trent Grisham",
    "Austin Nola",
    "Ke'Bryan Hayes",
    "Jose Iglesias",
    "Jackie Bradley Jr.",
    "Chris Taylor",
    "Clint Frazier",
    "Brian Anderson",
    "Miguel Rojas",
    "Mark Canha",
    "Yoan Moncada",
    "Jonathan Villar",
    "Matt Chapman",
    "Josh Donaldson",
    "Carlos Santana",
    "Gleyber Torres",
    "Austin Meadows",
    "Jorge Soler",
    "Trey Mancini",
    "Mitch Garver",
    "J.D. Martinez",
    "Anthony Rizzo",
    "Ramon Laureano",
    "Gio Urshela",
    "Kevin Newman",
  ];

  let randomPlayer =
    players[Math.floor(Math.floor(Math.random() * players.length))];
  return randomPlayer.split(" ");
}

// Gets the player's information and year, returns all players from that year
async function fetchData(firstName, lastName) {
  const inputFirstName = firstName;
  const inputLastName = lastName;
  const searchYear = 2022; //document.getElementById('year-dropdown').value;
  async function getPlayers(year) {
    let response = await fetch(
      "https://statsapi.mlb.com/api/v1/sports/1/players?season=" + year
    );
    let data = await response.json();
    return data.people;
  }

  // Assigns list of all the players to a variable
  let players = await getPlayers(searchYear);

  // Creates two dictionaries, one for going from player ID to their name and vice versa
  var idToNameDict = new Object();
  var nameToIdDict = new Object();

  // First fills out dict from id:name (doing name:id first missed a few entries for some reason)
  for (let i = 0; i < players.length; i++) {
    idToNameDict[players[i].id] = players[i].fullName
      .replace("í", "i")
      .replace("é", "e")
      .replace("á", "a");
  }

  // Fills out dictionary for going from name to player ID
  for (const [key, value] of Object.entries(idToNameDict)) {
    nameToIdDict[value] = key;
  }

  // Gets the player's information
  let inputPlayer = inputFirstName + " " + inputLastName;
  let playerId = nameToIdDict[inputPlayer];
  async function getPlayerInfo() {
    let response = await fetch(
      "https://statsapi.mlb.com/api/v1/people?personIds=" +
        playerId +
        "&hydrate=stats(group=[batting],type=[yearByYear])"
    );
    let data = await response.json();
    return data.people[0];
  }
  let playerStats = await getPlayerInfo();

  //   Gets player data to be displayed next to headshot
  let name = playerStats.fullName;
  let position = playerStats.primaryPosition.abbreviation;
  let team = playerStats.stats[0].splits.slice(-1)[0].team.name;

  let number = playerStats.primaryNumber;

  let teamsDict = {
    "Arizona Diamondbacks": "29",
    "Atlanta Braves": "15",
    "Baltimore Orioles": "1",
    "Boston Red Sox": "2",
    "Chicago Cubs": "16",
    "Chicago White Sox": "4",
    "Cincinnati Reds": "17",
    "Cleveland Guardians": "5",
    "Colorado Rockies": "27",
    "Detroit Tigers": "6",
    "Houston Astros": "18",
    "Kansas City Royals": "7",
    "Los Angeles Angels": "3",
    "Los Angeles Dodgers": "19",
    "Miami Marlins": "28",
    "Milwaukee Brewers": "8",
    "Minnesota Twins": "9",
    "New York Mets": "21",
    "New York Yankees": "10",
    "Oakland Athletics": "11",
    "Philadelphia Phillies": "22",
    "Pittsburgh Pirates": "23",
    "San Diego Padres": "25",
    "San Francisco Giants": "26",
    "Seattle Mariners": "12",
    "St. Louis Cardinals": "24",
    "Tampa Bay Rays": "30",
    "Texas Rangers": "13",
    "Toronto Blue Jays": "14",
    "Washington Nationals": "20",
  };

  // Gets player's team's ESPN API number from teamsDict
  let teamNumber = teamsDict[team];

  // Retrieves the roster of the player's team from ESPN's API
  async function getTeam() {
    let response = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/" +
        teamNumber +
        "?enable=roster"
    );
    let data = await response.json();
    return data;
  }

  // Assigns the player's team's roster to a variable and establishes variable to hold link to player's headshot
  let teamRoster = await getTeam();
  var playerPic = "";

  let espnInputPlayer = inputPlayer
    .replace("í", "i")
    .replace("é", "e")
    .replace("á", "a");

  // async function getHeadshotOld() {
  //   for (let i = 0; i < teamRoster.team.athletes.length; i++) {
  //     if (teamRoster.team.athletes[i].fullName == espnInputPlayer) {
  //       playerPic = teamRoster.team.athletes[i].headshot.href;
  //       break;
  //     }
  //   }
  //   return playerPic;
  // }

  // Goes through list of team's players and finds the headshot for the player whose name matches the input, assigns the headshot to be dynamically displayed on the Results page
  async function getHeadshot() {
    let playerPic = "";
    let response = await fetch(
      "https://sports.core.api.espn.com/v3/sports/baseball/mlb/athletes?limit=18000"
    );
    let data = await response.json();

    for (let i = 0; i < data.count; i++) {
      if (data.items[i].fullName == espnInputPlayer) {
        playerId = data.items[i].id;
        break;
      }
    }

    if (playerId) {
      playerPic =
        "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/" +
        playerId +
        ".png&w=350&h=254";
    }

    return playerPic;
  }

  let headshot = await getHeadshot();

  return [playerStats.stats[0].splits, headshot];
}

export { randomPlayerGenerator, teamAbbreviator, fetchData };
