const postgres = require('../database/postgres');
const { db } = postgres;
const getDayLeaders = require('./api');

exports.getGames = async (req, res) => {
  const id = req.params.date;
  // console.log(id);
  try {
    let data = await db.query('SELECT * FROM game WHERE date = $1', id);
    // let list = await db.query('SELECT name, teamID, awards FROM player INNER JOIN season19 ON player.playerID = season19.playerID WHERE awards > 10');
    // console.log('I got data from database: ', data);
    // if (list.length) {
    //   console.log (list.length)
    //   res.status(200).send(list);
    if (data.length) {
      // console.log (data)
      res.status(200).send(data);
    } else {
      let games = await getDayLeaders(id);
      // console.log('games', games)
    }
  }
  catch (error) { 
      console.log('Selecting from db is failed: ', error);
      // res.status(500).send(data); 
  };
}

exports.postTeam = async (ID, name, logo) => {
  try {
    //use prepared statement to insert team info if it doesn't exist
    let qr = 'INSERT INTO team (teamID, name, logo) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT * FROM team WHERE teamID=$4)';
    let result = await db.query(qr, [ID, name, logo, ID]);
    // console.log('Team list is updated on Postgres: ', result);
  }
  catch (error) {
    // console.log('POSTTeam is failed: ', error);
  }
}

exports.postPlayer = async (ID, name, team) => {
  try {
    let start = 1;
    //use prepared statement to insert team info if it doesn't exist
    let qr1 = 'INSERT INTO player (playerID, name, teamID) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT * FROM player WHERE playerID=$4)';
    let result1 = await db.query(qr1, [ID, name, team, ID]);
    //update the number of "PlayerOfTheGame awards" if player exists or insert a new raw
    let qr2 = 'INSERT INTO season19 (playerID, awards) VALUES ($1, $2) ON CONFLICT (playerID) DO UPDATE SET awards = season19.awards + 1';
    let result2 = await db.query(qr2, [ID, start]);
    console.log('Player is posted on Postgres: ', result1, result2);
  }
  catch (error) {
    console.log('POSTPlayer is failed: ', error);
  }
}

exports.postGame = async (date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2) => {
  try {
    let qr = 'INSERT INTO game (date, gameID, winningTeamID, losingTeamID, bestPlayer1, bestPlayer2, score, statsBP1, statsBP2) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9';
    let result = await db.query(qr, [date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2]);
    console.log('Game is posted on Postgres: ', result);
  }
  catch (error) {
    console.log('POSTGame is failed: ', error);
  }
}
// exports.update = (req, res) => {
    
//   };

// exports.delete = (req, res) => {
    
// };