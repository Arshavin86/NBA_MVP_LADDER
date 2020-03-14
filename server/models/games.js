exports.postGame = async (date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2) => {
  try {
    const qr = 'INSERT INTO game (date, gameID, winningTeamID, losingTeamID, bestPlayer1, bestPlayer2, score, statsBP1, statsBP2) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9 WHERE NOT EXISTS (SELECT * FROM game WHERE gameID=$2)'
    const result = await db.query(qr, [date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2])
    // console.log('Game is posted on Postgres: ', ID);
  } catch (error) {
    console.log('POSTGame is failed: ', error)
  }
}
