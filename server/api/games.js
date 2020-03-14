const { db } = require('../../database/db')
const { getDayLeaders } = require('../models/dayLeaders')

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
exports.getGames = async (req, res) => {
  const id = req.params.date

  try {
    const data1 = await db.query('SELECT game.*, team.name, team.logo FROM game INNER JOIN team ON game.winningteamid = team.teamID WHERE date = $1', id)
    if (data1.length) {
      // function to populate games object by additional info
      const start = async (data) => {
        try {
          await asyncForEach(data, async (game) => {
            const { losingteamid, bestplayer1 } = game
            const data2 = await db.query('SELECT name, logo FROM team WHERE teamID = $1', losingteamid)
            const data3 = await db.query('SELECT firstName, lastName FROM player WHERE playerID = $1', bestplayer1)

            // because there are almost no NBA players playing in Summer league
            // we get an empty array as data3,
            // so we have to send responce witn status 500 in that case.
            // rarely, when MVP of the game is an NBA player, FE gets that games
            if (data3.length) {
              // there is a problem: in some cases there is no 'losingTeam' property in data object sent to user!
              // console.log(data3);
              game.losingTeam = data2
              if (!game.losingTeam) {
                console.log('losingTeam property is not written down to the response object!')
                res.sendStatus(500)
              }
              game.BP1name = data3
            } else {
              res.sendStatus(500)
            }
          })
          console.log(`${data.length} games are found in DB`)
          res.status(200).send(data)
          return data
        } catch (e) {
          console.log(e)
          res.sendStatus(500)
        }
      }
      start(data1)
    } else {
      const games = await getDayLeaders(id)
      if (!games) {
        res.sendStatus(500)
      } else {
        /** *****rewrite this block as lines 21-42 when season starts*****/
        const data4 = await db.query('SELECT game.*, team.name, team.logo FROM game INNER JOIN team ON game.winningteamid = team.teamID WHERE date = $1', id)
        res.status(200).send(data4)
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
  } catch (error) {
    console.log('Selecting from db is failed: ', error)
    res.sendStatus(500)
  }
}
