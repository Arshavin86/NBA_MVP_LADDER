const { db } = require('../../database/db')

module.exports = {
  getSeasons
}

async function getSeasons ({ queryArray, year }) {
  try {
    // check if we need playOffs or regular season
    if (queryArray[0][0] === 'p') {
      const qr = 'SELECT firstName, lastName, teamID, awards, pos, position FROM player INNER JOIN playOff$1 ON player.playerID = playOff$1.playerID ORDER BY position ASC;'
      const list = await db.query(qr, [year])
      return list
    } else {
      const qr = 'SELECT firstName, lastName, teamID, awards, pos, position FROM player INNER JOIN season$1 ON player.playerID = season$1.playerID ORDER BY position ASC;'
      const list = await db.query(qr, [year])
      return list
    }
  } catch (e) {
    console.error('getSeasons is failed: ', e)
  }
}
