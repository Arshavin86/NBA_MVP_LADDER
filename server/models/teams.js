const { db } = require('../../database/db')

module.exports = {
  postTeam,
  getTeam
}

async function postTeam (ID, name, logo) {
  try {
    // use prepared statement to insert team info if it doesn't exist
    const qr = 'INSERT INTO team (teamID, name, logo) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT * FROM team WHERE teamID=$4)'
    await db.query(qr, [ID, name, logo, ID])
    console.log('Team list is updated on Postgres')
  } catch (error) {
    console.log('postTeam is failed: ', error)
  }
}

async function getTeam (teamId) {
  try {
    return await db.query('SELECT name, logo FROM team WHERE teamID = $1', teamId)
  } catch (error) {
    console.log('getTeam is failed: ', error)
  }
}
