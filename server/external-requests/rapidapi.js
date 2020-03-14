
const request = require('request-promise')
const config = require('../../config/api-nba-v1.p')

module.exports = {
  getGamesByDate,
  getStatsByGameID,
  getNameByPlayerID,
  getPhotoByName
}

const headers = {
  'User-Agent': 'request',
  'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
  'X-RapidAPI-Key': config.X_RapidAPI_Key
}
const URL = 'https://api-nba-v1.p.rapidapi.com'

// tryed to use one class constructor for all functions:

// class ApiGetter {
//     constructor (endpoint) {
//         this.options = {
//             url: URL + endpoint,
//             headers: headers,
//             json: true // Automatically parses the JSON string in the response
//         }
//         this.get = this.get.bind(this);
//     }
//     async get (param) {
//         //the issue is that it keeps on adding new andpoints here, like "4883 + 4884":
//         this.options.url += param;
//         let result = await request(this.options);
//         return result;
//     }
// }

// let getGamesByDate = new ApiGetter ('/games/date/');
// let getStatsByGameID = new ApiGetter ('/statistics/players/gameId/');
// let getNameByPlayerID = new ApiGetter ('/players/playerId/');

// module.exports = {
//     getGamesByDate: getGamesByDate.get,
//     getStatsByGameID: getStatsByGameID.get,
//     getNameByPlayerID: getNameByPlayerID.get
// }

function getGamesByDate (date) {
  const options = {
    url: `${URL}/games/date/${date}`,
    headers: headers,
    json: true // Automatically parses the JSON string in the response
  }
  return request(options)
}

function getStatsByGameID (gameID) {
  const options = {
    url: `${URL}/statistics/players/gameId/${gameID}`,
    headers: headers,
    json: true
  }
  return request(options)
}

function getNameByPlayerID (playerID) {
  const options = {
    url: `${URL}/players/playerId/${playerID}`,
    headers: headers,
    json: true
  }
  return request(options)
}

function getPhotoByName (lastName, firstName) {
  const options = {
    url: `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`,
    json: true
  }
  return request(options)
}
