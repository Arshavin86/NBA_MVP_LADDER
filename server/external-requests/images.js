const request = require('request-promise')
const URL = 'https://nba-players.herokuapp.com'

exports.getImages = (firstName, lastName) => {
  const options = {
    url: `${URL}/players/${lastName}/${firstName}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return request(options)
}
