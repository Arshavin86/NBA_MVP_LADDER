const { db } = require('../../database/db')

module.exports = {
  postPlayer,
  getPlayers,
  getPlayer
}

async function postPlayer (ID, seasonName) {
  try {
    const start = 1
    // update the number of "PlayerOfTheGame awards" if player exists or insert a new raw
    const qr = 'INSERT INTO $1 (playerID, awards) VALUES ($2, $3) ON CONFLICT (playerID) DO UPDATE SET awards = $1.awards + 1'
    const result = await db.query(qr, [seasonName, ID, start])
    console.log('Award is posted on Postgres: ', result)
  } catch (error) {
    console.log('POSTPlayer failed: ', error)
  }
}

async function getPlayers () {
  try {
    const qr = 'SELECT player.*, team.name FROM player INNER JOIN team ON player.teamID = team.teamID ORDER BY player.lastname ASC;'
    const players = await db.query(qr)
    return players
  } catch (error) {
    console.log('getPlayers failed: ', error)
  }
}

async function getPlayer ({ firstName, lastName }) {
  try {
    const qr = 'SELECT player.*, team.name FROM player INNER JOIN team ON player.teamID = team.teamID WHERE firstName = $1 AND lastName = $2;'
    const player = await db.query(qr, [firstName, lastName])
    return player
  } catch (error) {
    console.log('getPlayers failed: ', error)
  }
}
