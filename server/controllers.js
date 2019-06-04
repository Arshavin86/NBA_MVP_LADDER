const postgres = require('../database/postgres');
const { db } = postgres;
const getDayLeaders = require('./api');

exports.getGames = async (req, res) => {
  // console.log('id: ', req.params);
  const id = req.params.date;
  // console.log(id);
  try {

    let data = await db.query('SELECT game.*, team.name, team.logo FROM game INNER JOIN team ON game.winningteamid = team.teamID WHERE date = $1', id);
    if (data.length) {
      async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
  
      const start = async (data) => {
        try {
          await asyncForEach(data, async game => {
            let data2 = await db.query('SELECT name, logo FROM team WHERE teamID = $1', game.losingteamid);
            let data3 = await db.query('SELECT name FROM player WHERE playerID = $1', game.bestplayer1);
            //there is a problem: in some cases there is no 'losingTeam' property in data object sent to user! 
            game['losingTeam'] = data2;
            if (!game['losingTeam']) {
              console.log ('losingTeam property is not written down to the response object!');
              res.sendStatus(500);
            }
            game['BP1name'] = data3;
          });
          console.log('Games are found in DB');
          // console.log(data);
          res.status(200).send(data);
          return data;
        }
        catch (e) {
          console.log (e);
          res.sendStatus(500);
        }
      }
      start(data);
    } else {
      let games = await getDayLeaders(id);
      if (!games) {
        res.sendStatus(500);
      } else {
        data = await db.query('SELECT * FROM game WHERE date = $1', id);
        // console.log(data);
        res.status(200).send(data);
      }
    }


    // let list = await db.query('SELECT name, teamID, awards FROM player INNER JOIN season16 ON player.playerID = season16.playerID WHERE awards > 12 ORDER BY awards DESC;');
    // // let total = 0;
    // // list.forEach(player => {
    // //   total += player['awards'];
    // // });
    // // console.log(total);
    // if (list.length) {
    //   console.log (list.length)
    //   res.status(200).send(list);
    // }


  }
  catch (error) { 
      console.log('Selecting from db is failed: ', error);
      res.sendStatus(500); 
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
    let qr2 = 'INSERT INTO playOff19 (playerID, awards) VALUES ($1, $2) ON CONFLICT (playerID) DO UPDATE SET awards = playOff19.awards + 1';
    let result2 = await db.query(qr2, [ID, start]);
    console.log('Player is posted on Postgres: ', result1, result2);
  }
  catch (error) {
    console.log('POSTPlayer is failed: ', error);
  }
}

exports.postGame = async (date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2) => {
  try {
    let qr = 'INSERT INTO game (date, gameID, winningTeamID, losingTeamID, bestPlayer1, bestPlayer2, score, statsBP1, statsBP2) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9 WHERE NOT EXISTS (SELECT * FROM game WHERE gameID=$2)';
    let result = await db.query(qr, [date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2]);
    console.log('Game is posted on Postgres: ', ID);
  }
  catch (error) {
    console.log('POSTGame is failed: ', error);
  }
}
// exports.update = (req, res) => {
    
//   };

// exports.delete = (req, res) => {
    
// };