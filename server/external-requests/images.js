const request = require('request-promise')
const URL = 'https://nba-players.herokuapp.com'

exports.getImages = (firstName, lastName) => {
  const options = {
    url: `${URL}/players/${lastName}/${firstName}`,
    // encoding: null,
    // resolveWithFullResponse: true,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
    // json: true,
  }
  return request(options)
}
