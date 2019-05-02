// const request = require('request-promise');
const request = require('request');
const config = require('../config/api-nba-v1.p');
var Promise = require('bluebird');


let getGamesByDate = (date) => {
  let options = {
    url: `https://api-nba-v1.p.rapidapi.com/games/date/${date}`,
    headers: {
      'User-Agent': 'request',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com', 
      'X-RapidAPI-Key': config.X_RapidAPI_Key
    },
    json: true // Automatically parses the JSON string in the response
  };

 return new Promise ((resolve, reject) => {
  request(options, (err, res, body) => {
    if (err) {
      reject(err);
    } else {
      console.log('number of games:', body.api.games.length);
      resolve(body.api.games);
    }
  });
 })
}

module.exports.getGamesByDate = getGamesByDate;

