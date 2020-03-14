const db = require('../../database/db')

exports.postTeam = async (ID, name, logo) => {
  try {
    // use prepared statement to insert team info if it doesn't exist
    const qr = 'INSERT INTO team (teamID, name, logo) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT * FROM team WHERE teamID=$4)'
    const result = await db.query(qr, [ID, name, logo, ID])
    console.log('Team list is updated on Postgres: ', result)
  } catch (error) {
    console.log('POSTTeam is failed: ', error)
  }
}
