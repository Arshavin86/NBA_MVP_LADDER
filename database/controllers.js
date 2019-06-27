const postgres = require('./postgres');
const { db } = postgres;
const getDayLeaders = require('../server/nba_api');
const getImages = require('../helpers/images_api');

 const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.getGames = async (req, res) => {
  // console.log('id: ', req.params);
  const id = req.params.date;
  // console.log(id);
  try {
    const data = await db.query('SELECT game.*, team.name, team.logo FROM game INNER JOIN team ON game.winningteamid = team.teamID WHERE date = $1', id);
    if (data.length) {

      //function to populate games object by additional info
      const start = async data => {
        try {
          await asyncForEach(data, async game => {
            const data2 = await db.query('SELECT name, logo FROM team WHERE teamID = $1', game.losingteamid);
            const data3 = await db.query('SELECT firstName, lastName FROM player WHERE playerID = $1', game.bestplayer1);

            //there is a problem: in some cases there is no 'losingTeam' property in data object sent to user! 
            // console.log(data3);
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
      const games = await getDayLeaders(id);
      if (!games) {
        res.sendStatus(500);
      } else {
        data = await db.query('SELECT * FROM game INNER JOIN team WHERE date = $1', id);
        // console.log(data);
        res.status(200).send(data);
      }
    }


    // const list = await db.query('SELECT name, teamID, awards FROM player INNER JOIN season16 ON player.playerID = season16.playerID WHERE awards > 12 ORDER BY awards DESC;');
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
    const qr = 'INSERT INTO team (teamID, name, logo) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT * FROM team WHERE teamID=$4)';
    const result = await db.query(qr, [ID, name, logo, ID]);
    // console.log('Team list is updated on Postgres: ', result);
  }
  catch (error) {
    // console.log('POSTTeam is failed: ', error);
  }
}

exports.postPlayer = async ID => {
  try {
    const start = 1;
    //update the number of "PlayerOfTheGame awards" if player exists or insert a new raw
    const qr2 = 'INSERT INTO playOff19 (playerID, awards) VALUES ($1, $2) ON CONFLICT (playerID) DO UPDATE SET awards = playOff19.awards + 1';
    const result2 = await db.query(qr2, [ID, start]);
    console.log('Award is posted on Postgres: ', result1, result2);
  }
  catch (error) {
    console.log('POSTPlayer is failed: ', error);
  }
}

exports.postGame = async (date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2) => {
  try {
    const qr = 'INSERT INTO game (date, gameID, winningTeamID, losingTeamID, bestPlayer1, bestPlayer2, score, statsBP1, statsBP2) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9 WHERE NOT EXISTS (SELECT * FROM game WHERE gameID=$2)';
    const result = await db.query(qr, [date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2]);
    console.log('Game is posted on Postgres: ', ID);
  }
  catch (error) {
    console.log('POSTGame is failed: ', error);
  }
}

exports.getPlayers = async (req, res) => {
  
  try {

    // const image = await getImages ('Lebron', 'James'); 
    // const data = {image: image}
    // res.status(200).send(data);

    const data = await db.query('SELECT player.*, team.name FROM player INNER JOIN team ON player.teamID = team.teamID');
    
    res.status(200).send(data);
    // //function to add player photo to each player
    // const addImage = async data => {
    //   try {
    //     await asyncForEach(data, async player => {
    //       const image = await getImages (player.firstname, player.lastname);
    //       player['image'] = image;
    //     });
    //     // console.log('Number of players: ', data.length)
    //     res.status(200).send(data);
      // } catch (e) {
      //   console.log(e);
      // }
      
    // }

    // addImage(data);
    
  } catch (e) {
    console.log('getPlayers is failed: ', e);
  }
}

exports.getSeasons = async (req, res) => {
  
  try {
    const list = await db.query('SELECT firstName, lastName, awards, position, pos, name FROM player INNER JOIN season19 ON player.playerID = season19.playerID INNER JOIN team ON player.teamID = team.teamID ORDER BY position ASC;;');

    // const list = await db.query('SELECT firstName, lastName, teamID, awards FROM player INNER JOIN season19 ON player.playerID = season19.playerID WHERE awards > 12 ORDER BY awards DESC;');
    
      res.status(200).send(list);
    
    
  } catch (e) {
    console.log('getSeasons is failed: ', e);
  }
}