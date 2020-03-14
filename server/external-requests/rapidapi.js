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

function getGamesByDate (date) {
  const options = {
    url: `${URL}/games/date/${date}`,
    headers: headers,
    json: true
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
