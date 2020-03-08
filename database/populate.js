const postgres = require('./postgres')
const { db } = postgres
const request = require('request-promise')
const { statsCalculator } = require('../MVPCalculator/statsCalculator')
const config = require('../config/api-nba')
const headers = {
  'User-Agent': 'request',
  'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
  'X-RapidAPI-Key': config.X_RapidAPI_Key
}
const URL = 'https://api-nba-v1.p.rapidapi.com'

const getGameByGameID = async gameID => {
  const options = {
    url: `${URL}/games/gameId/${gameID}`,
    headers: headers,
    json: true
  }
  return request(options)
}

const getStatsByGameID = async gameID => {
  const options = {
    url: `${URL}/statistics/players/gameId/${gameID}`,
    headers: headers,
    json: true
  }
  return request(options)
}

const getNameByPlayerID = async playerID => {
  const options = {
    url: `${URL}/players/playerId/${playerID}`,
    headers: headers,
    json: true
  }
  return request(options)
}

const postGame = async (date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2) => {
  try {
    const qr = 'INSERT INTO game (date, gameID, winningTeamID, losingTeamID, bestPlayer1, bestPlayer2, score, statsBP1, statsBP2) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9'
    const result = await db.query(qr, [date, ID, WTID, LTID, BP1, BP2, score, SBP1, SBP2])
    console.log('Game is posted on Postgres: ', ID)
  } catch (error) {
    console.log('POSTGame is failed: ', error)
  }
}

// populate game table
const gameAdd = async () => {
  let winningTeamID
  let losingTeamID
  const matchDay = {}
  let gameId = 1
  try {
    while (gameId < 6222) {
      const res = await getGameByGameID(gameId)

      if (res.api.games.length) {
        const game = res.api.games[0]
        // prevent getting the "junk" game objects (with no real data)
        if (game.vTeam.score.points.length) {
          // find the winning team
          if (Number(game.vTeam.score.points) > Number(game.hTeam.score.points)) {
            winningTeamID = game.vTeam.teamId
            losingTeamID = game.hTeam.teamId
          } else {
            winningTeamID = game.hTeam.teamId
            losingTeamID = game.vTeam.teamId
          }
          var date = game.startTimeUTC.slice(0, 10)
          console.log(date)
          // var teams = [game.vTeam.fullName, game.hTeam.fullName];
          var score = [game.vTeam.score.points, game.hTeam.score.points]
          // matchDay['date'] = game.startTimeUTC.slice(0,10);
          // // matchDay['teams'] = [game.vTeam.fullName, game.hTeam.fullName];
          // matchDay['score'] = [game.vTeam.score.points, game.hTeam.score.points];
        }
      }
      // get players stats for the game
      const players = await getStatsByGameID(gameId)

      const leader = {
        total: 0,
        plusMinus: 0,
        fgp: 0
      }
      let currentTotal
      // prevent getting an empty statistics array
      if (players.api.statistics.length) {
        // calculate stats of each player from winning team and compare it with current best result for current game
        players.api.statistics.forEach(player => {
          const { points, assists, totReb, steals, blocks, turnovers, plusMinus, fgm, fga, fgp, ftm, fta, tpm, tpa, offReb, defReb, pFouls, playerId, teamId } = player
          if (teamId === winningTeamID) {
            currentTotal = statsCalculator(points, assists, totReb, steals, blocks, turnovers, fgm, fga, ftm, fta, tpm, tpa, offReb, defReb, pFouls, plusMinus)

            if (currentTotal > leader.total || (currentTotal === leader.total && plusMinus > leader.plusMinus) ||
                        (currentTotal === leader.total && plusMinus === leader.plusMinus && fgp > leader.fgp)) {
              leader.total = currentTotal
              leader.player1Id = playerId
              leader.teamId = teamId
              leader.plusMinus = plusMinus
              leader.fgp = fgp
              leader.player2Id = undefined
              leader.statsBP1 = [points, assists, totReb, steals, blocks, turnovers, plusMinus, fgp]
            } else if (currentTotal === leader.total && plusMinus === leader.plusMinus && fgp === leader.fgp) {
              leader.player2Id = playerId
              leader.statsBP2 = [points, assists, totReb, steals, blocks, turnovers, plusMinus, fgp]
            }
          }
        })
        // check if data from API has playerID
        if (!leader.player1Id) {
          console.log(`There is no playerID in game ${gameId} stats!`)
          return 0
        }
        var bestPlayer1 = await getNameByPlayerID(leader.player1Id)

        var bestPl1 = bestPlayer1.api.players[0].playerId
        var statsBP1 = leader.statsBP1

        if (leader.player2Id) {
          var bestPlayer2 = await getNameByPlayerID(leader.player2Id)
          var bestPl2 = `${bestPlayer2.api.players[0].firstName} ${bestPlayer2.api.players[0].lastName}`
          var statsBP2 = leader.statsBP2
        } else {
          bestPl2 = 'N/A'
        }
        // const {date, score} = matchday;
        // post a game info
        await postGame(date, gameId, winningTeamID, losingTeamID, bestPl1, bestPl2, score, statsBP1, statsBP2)
      } else {
        console.log(`There is no stats of game ${gameId} for ${gameId}!!!!!`)
        return 0
      }
      gameId++
    }
    console.log(`Done with ${gameId} teams`)
  } catch (e) {
    console.log(e)
  }
}

gameAdd()

// const getDayLeaders = require('../server/nba_api');

// populate team table
const teamAdd = async () => {
  let teamid = 1
  try {
    while (teamid < 42) {
      const options = {
        url: `${URL}/teams/teamId/${teamid}`,
        headers: headers,
        json: true
      }
      const res = await request(options)

      const { fullName, teamId, nickname, logo, shortName } = res.api.teams[0]

      const qr = 'INSERT INTO team (teamID, name, logo, nickname, shortName) SELECT $1, $2, $3, $4, $5'
      const result = await db.query(qr, [teamId, fullName, logo, nickname, shortName])
      console.log('ID passed: ', teamid)
      teamid++
    }
    console.log(`Done with ${teamid} teams`)
  } catch (e) {
    console.log(e)
  }
}

teamAdd()

// populate player table
const playerAdd = async () => {
  let playerId = 1
  try {
    while (playerId < 1845) {
      const options = {
        url: `${URL}/players/playerId/${playerId}`,
        headers: headers,
        json: true
      }
      const res = await request(options)

      // avoid query player from WNBA
      if (res.api.players[0].leagues.standard) {
        const { teamId, firstName, lastName, yearsPro, collegeName, country, dateOfBirth, affiliation, heightInMeters, weightInKilograms, startNba } = res.api.players[0]
        const { jersey, active, pos } = res.api.players[0].leagues.standard

        // avoid query not NBA player or with no teamId in his profile
        const team = await db.query('SELECT * FROM team WHERE teamID = $1', teamId)
        if (team.length) {
          const qr = 'INSERT INTO player (playerID, teamID, firstName, lastName, yearsPro, collegeName, country, dateOfBirth, affiliation, heightInMeters, weightInKilograms, startNba, pos, jersey, active) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15'
          const result = await db.query(qr, [playerId, teamId, firstName, lastName, yearsPro, collegeName, country, dateOfBirth, affiliation, heightInMeters, weightInKilograms, startNba, pos, jersey, active])
          console.log('ID passed: ', playerId)
        } else {
          console.log('ID banned: ', playerId)
        }
      } else {
        console.log('He is a female!!')
      }
      playerId++
    }
    console.log('Done')
  } catch (e) {
    console.log(e)
  }

  // let data = await db.query('SELECT game.*, team.name, team.logo FROM game INNER JOIN team ON game.winningteamid = team.teamID WHERE date = $1', id);
}

playerAdd()
