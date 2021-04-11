const { db } = require('../../database/db')

module.exports = {
  postPlayer,
  getPlayers,
  getPlayerByName,
  getPlayerById
}

async function postPlayer (ID, seasonName) {
  try {
    const start = 1
    // update the number of "PlayerOfTheGame awards" if player exists or insert a new raw
    const qr = 'INSERT INTO $1 (playerID, awards) VALUES ($2, $3) ON CONFLICT (playerID) DO UPDATE SET awards = $1.awards + 1'
    const result = await db.query(qr, [seasonName, ID, start])
    console.log('Award is posted on Postgres: ', result)
  } catch (error) {
    console.error('POSTPlayer failed: ', error)
  }
}

async function getPlayers () {
  try {
    const qr = 'SELECT player.*, team.name FROM player INNER JOIN team ON player.teamID = team.teamID ORDER BY player.lastname ASC;'
    return await db.query(qr)
  } catch (error) {
    console.error('getPlayers failed: ', error)
  }
}

async function getPlayerByName ({ firstName, lastName }) {
  try {
    const qr = 'SELECT player.*, team.name FROM player INNER JOIN team ON player.teamID = team.teamID WHERE firstName = $1 AND lastName = $2;'
    return await db.query(qr, [firstName, lastName])
  } catch (error) {
    console.error('getPlayerByName failed: ', error)
  }
}

async function getPlayerById (playerId) {
  try {
    return await db.query(
      'SELECT firstName, lastName FROM player WHERE playerID = $1;',
      playerId
    )
  } catch (error) {
    console.error('getPlayerById failed: ', error)
  }
}
