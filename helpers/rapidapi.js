// const request = require('request-promise');
const request = require('request-promise');
const config = require('../config/api-nba-v1.p');
const Promise = require('bluebird');
const headers = {
    'User-Agent': 'request',
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com', 
    'X-RapidAPI-Key': config.X_RapidAPI_Key
};
const URL = `https://api-nba-v1.p.rapidapi.com`;


async function getGamesByDate(date) {
    let options = {
        url: `${URL}/games/date/${date}`,
        headers: headers,
        json: true // Automatically parses the JSON string in the response
    };
    return await request(options);
}

async function getStatsByGameID (gameID) {
    let options = {
      url: `${URL}/statistics/players/gameId/${gameID}`,
      headers: headers,
      json: true
    };
    return await request(options);
  }

module.exports = {
    getGamesByDate: getGamesByDate,
    getStatsByGameID: getStatsByGameID
}

