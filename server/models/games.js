const { db } = require('../../database/db')

module.exports = {
  postGame,
  getGames
}

async function postGame (game) {
  const {
    date,
    gameId,
    team,
    losingTeamID,
    bestPl1,
    bestPl2,
    score,
    statsBP1,
    statsBP2
  } = game
  try {
    const qr = 'INSERT INTO game (date, gameID, winningTeamID, losingTeamID, bestPlayer1, bestPlayer2, score, statsBP1, statsBP2) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9 WHERE NOT EXISTS (SELECT * FROM game WHERE gameID=$2)'
    await db.query(
      qr,
      [
        date,
        gameId,
        team,
        losingTeamID,
        bestPl1,
        bestPl2,
        score,
        statsBP1,
        statsBP2
      ]
    )
    console.log('Game is posted on Postgres: ', gameId)
  } catch (error) {
    console.error('postGame is failed: ', error)
  }
}

async function getGames (date) {
  try {
    return await db.query('SELECT game.*, team.name, team.logo FROM game INNER JOIN team ON game.winningteamid = team.teamID WHERE date = $1', date)
  } catch (error) {
    console.error('getGames is failed: ', error)
  }
}
