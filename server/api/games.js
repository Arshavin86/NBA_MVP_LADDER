const { storeGamesStats } = require('../models/dayLeaders')
const { getTeam } = require('../models/teams')
const { getPlayerById } = require('../models/players')
const { getGames } = require('../models/games')

exports.getGames = async (req, res) => {
  const date = req.params.date

  let games = await getGames(date)

  if (games.length) {
    const result = await addBestPlayerAndLoosingTeam(games)

    if (result.error) {
      res.sendStatus(500)
      return
    }

    if (result.notFound) {
      res.status(404).send(new Error(result.message))
      return
    }

    res.status(200).send(result.games)
    return
  }
  games = await storeGamesStats(date)
  if (!games) {
    res.status(404).send(new Error('No games found'))
    return
  }

  /** *****rewrite this block as lines 21-42 when season starts*****/
  games = await getGames(date)
  res.status(200).send(games)

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
  //   } catch (error) {
  //     console.log('Selecting from db is failed: ', error)
  //     res.sendStatus(500)
  // }
}

async function addBestPlayerAndLoosingTeam (games) {
  try {
    for await (const game of games) {
      const { losingteamid, bestplayer1 } = game
      const losingTeam = await getTeam(losingteamid)
      const bestPlayerName = await getPlayerById(bestplayer1)

      // because NBA players usually don't play in Summer league we get an empty array as bestPlayerName,
      // so we have to send responce witn status 404 in that case.
      // rarely, when MVP of the game is an NBA player, FE gets that games
      if (!bestPlayerName.length) {
        console.log(`There is no bestPlayer in the game ${game.gameID}`)
        return {
          notFound: true,
          message: 'No best player found'
        }
      }
      // there is a problem: in some cases there is no 'losingTeam' property in data object sent to user!
      if (!losingTeam.length) {
        console.log(`There is no losingTeam in the game ${game.gameID}`)
        return {
          notFound: true,
          message: 'No team found'
        }
      }
      game.losingTeam = losingTeam
      game.bestPlayerName = bestPlayerName
    }
    console.log(`${games.length} games are found in DB`)
    return { games }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}
