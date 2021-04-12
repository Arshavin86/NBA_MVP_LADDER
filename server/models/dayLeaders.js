const _ = require('lodash')

const {
  getGamesByDate, getStatsByGameID, getNameByPlayerID
} = require('../external-requests/rapidapi')
const { statsCalculator } = require('../utils/statsCalculator')
const Games = require('./games')

exports.storeGamesStats = async (date) => {
  try {
    // get all games played on one particular date
    const gamesObj = await getGamesByDate(date)
    let games = _.get(gamesObj, 'api.games')
    const dayCount = games.length
    console.log(`${dayCount} games on ${date}`)

    if (!dayCount) {
      console.log(`There is no game played in ${date}`)
      return 0
    }

    // filter out "junk" game objects (with no real data)
    games = games.filter(game => game.vTeam.score.points)

    const matchDay = getGamesInfo(games)

    for await (const team of Object.keys(matchDay)) {
      const players = await getStatsByGameID(matchDay[team].gameId)

      // prevent getting an empty statistics array
      if (!players.api.statistics.length) {
        console.log(`There is no stats on game ${matchDay[team].gameId} for ${matchDay[team].teams}!!!!!`)
        return 0
      }

      const leaders = findGameMVP(players, team)

      // get name of the best player of the game
      // console.log(leaders.player1Id, matchDay[team]['gameId']);

      // check if data from API has playerID
      if (!leaders.player1Id) {
        console.log(`There is no playerID in game ${matchDay[team].gameId} stats!`)
        return 0
      }
      const bestPlayer1 = await getNameByPlayerID(leaders.player1Id)

      // post or update player awards number
      // await database.postPlayer(leaders.player1Id, `${bestPlayer1.api.players[0].firstName}
      //   ${bestPlayer1.api.players[0].lastName}`, team);

      matchDay[team].bestPl1 = bestPlayer1.api.players[0].playerId
      matchDay[team].statsBP1 = leaders.statsBP1

      // get photo of player from nba-players.herokuapp.com in png
      // let photo = await getPhotoByName (bestPlayer1.api.players[0].lastName, bestPlayer1.api.players[0].firstName);
      // matchDay[team]['player1Photo'] = photo;
      if (leaders.player2Id) {
        const bestPlayer2 = await getNameByPlayerID(leaders.player2Id)
        // post or update player awards number
        // await database.postPlayer(leaders.player2Id, `${bestPlayer2.api.players[0].firstName}
        // ${bestPlayer2.api.players[0].lastName}`, team);

        matchDay[team].bestPl2 = `${bestPlayer2.api.players[0].firstName} ${bestPlayer2.api.players[0].lastName}`
        matchDay[team].statsBP2 = leaders.statsBP2

        // let photo = await getPhotoByName (bestPlayer2.api.players[0].lastName, bestPlayer2.api.players[0].firstName);
        // matchDay[team]['player2Photo'] = photo;
      } else {
        matchDay[team].bestPl2 = 'N/A'
      }

      const {
        score, gameId, losingTeamID, bestPl1, bestPl2, statsBP1, statsBP2
      } = matchDay[team]

      const game = {
        date,
        gameId,
        team,
        losingTeamID,
        bestPl1,
        bestPl2,
        score,
        statsBP1,
        statsBP2
      }
      await Games.postGame(game)
    }
    console.log('DONE!')
    return dayCount
  } catch (error) {
    console.error('ERROR', error.message)
  }
}

function getGamesInfo (games) {
  let winningTeamID
  let loosingTeamID
  let gameID
  const matchDay = {}

  // find gameId and id of winning team for each game
  games.forEach((game) => {
  // find the winning team
    if (Number(game.vTeam.score.points) > Number(game.hTeam.score.points)) {
      winningTeamID = game.vTeam.teamId
      loosingTeamID = game.hTeam.teamId
    } else {
      winningTeamID = game.hTeam.teamId
      loosingTeamID = game.vTeam.teamId
    }
    gameID = game.gameId
    matchDay[winningTeamID] = {
      teams: [game.vTeam.fullName, game.hTeam.fullName],
      score: [game.vTeam.score.points, game.hTeam.score.points],
      logos: [game.vTeam.logo, game.hTeam.logo],
      gameId: gameID,
      losingTeamID: loosingTeamID
    }

  //* */post a new team data (Uncomment next 2 lines if you need to post a new team)**
  // database.postTeam(game.vTeam.teamId, game.vTeam.fullName, game.vTeam.logo);
  // database.postTeam(game.hTeam.teamId, game.hTeam.fullName, game.hTeam.logo);
  })
  return matchDay
}

function findGameMVP (players, team) {
  const leaders = {
    total: 0,
    plusMinus: 0,
    fgp: 0
  }
  let currentTotal

  // filter out the losing team players
  const winners = players.api.statistics.filter(player => player.teamId === team)

  // calculate stats of each player from winning team
  // and compare it with current best result for current game
  winners.forEach((player) => {
    const {
      playerId,
      teamId,
      points,
      assists,
      totReb,
      steals,
      blocks,
      turnovers,
      plusMinus,
      fgp
    } = player

    currentTotal = statsCalculator(player)
    if (currentTotal > leaders.total ||
        (currentTotal === leaders.total && plusMinus > leaders.plusMinus) ||
        (currentTotal === leaders.total && plusMinus === leaders.plusMinus &&
        fgp > leaders.fgp)) {
      leaders.total = currentTotal
      leaders.player1Id = playerId
      leaders.teamId = teamId
      leaders.plusMinus = plusMinus
      leaders.fgp = fgp
      leaders.player2Id = undefined
      leaders.statsBP1 = [
        points,
        assists,
        totReb,
        steals,
        blocks,
        turnovers,
        plusMinus,
        fgp
      ]
    } else if (
      currentTotal === leaders.total &&
      plusMinus === leaders.plusMinus &&
      fgp === leaders.fgp
    ) {
      leaders.player2Id = playerId
      leaders.statsBP2 = [
        points,
        assists,
        totReb,
        steals,
        blocks,
        turnovers,
        plusMinus,
        fgp
      ]
    }
  })
  return leaders
}
