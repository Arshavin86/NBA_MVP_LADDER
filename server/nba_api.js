const {getGamesByDate, getStatsByGameID, getNameByPlayerID, getPhotoByName} = require('../helpers/rapidapi')
const {statsCalculator} = require('../MVPCalculator/statsCalculator');
const database = require('../database/controllers');

const getDayLeaders = async (date) => {
    let winningTeamID;
    let loosingTeamID;
    let gameID;
    let matchDay = {};

    
    // get all games played on one particular date
    let games = await getGamesByDate(date);
    console.log(`${games.api.games.length} games on ${date}`);
    const dayCount = games.api.games.length;

    if (games.api.games.length) {
        //prevent getting the "junk" game objects (with no real data)
        if (games.api.games[0].vTeam.score.points.length) {
            // find gameId and id of winning team for each game
            games.api.games.forEach(game => {
                //find the winning team
                if (Number(game.vTeam.score.points) > Number(game.hTeam.score.points)) {
                    winningTeamID = game.vTeam.teamId;
                    loosingTeamID = game.hTeam.teamId;
                } else {
                    winningTeamID = game.hTeam.teamId;
                    loosingTeamID = game.vTeam.teamId;
                }
                gameID = game.gameId;
                // console.log('winningTeamID: ', winningTeamID, 'gameID: ', gameID);
                matchDay[winningTeamID] = {
                    teams: [game.vTeam.fullName, game.hTeam.fullName],
                    score: [game.vTeam.score.points, game.hTeam.score.points],
                    logos: [game.vTeam.logo, game.hTeam.logo],
                    gameId: gameID,
                    losingTeamID: loosingTeamID,
                }

                //********************* */post a new team data (Uncomment next 2 lines if you need to post a new team)**********************
                // database.postTeam(game.vTeam.teamId, game.vTeam.fullName, game.vTeam.logo);
                // database.postTeam(game.hTeam.teamId, game.hTeam.fullName, game.hTeam.logo);

            });

            // console.log('matchDay: ', matchDay)
            //I can't use forEach with async/await so I use a variation of the for-of iteration statement which iterates over async iterable objects
            for await (const team of Object.keys(matchDay)) {
                //get players stats for each game
                let players = await getStatsByGameID(matchDay[team]['gameId'])
                // console.log('players', players);
                let leader = {
                    total: 0,
                    plusMinus: 0,
                    fgp: 0,
                };
                let currentTotal;
                //prevent getting an empty statistics array 
                if (players.api.statistics.length) {
                    //calculate stats of each player from winning team and compare it with current best result for current game
                    players.api.statistics.forEach( player => {
                        // console.log('player', player);
                        const {points, assists, totReb, steals, blocks, turnovers, plusMinus, fgm, fga, fgp, ftm, fta, tpm, tpa, offReb, defReb, pFouls, playerId, teamId} = player;
                        if (teamId === team) {
                            currentTotal = statsCalculator(points, assists, totReb, steals, blocks, turnovers, fgm, fga, ftm, fta, tpm, tpa, offReb, defReb, pFouls, plusMinus);
                            // console.log('total: ', currentTotal);
                            if (currentTotal > leader.total || (currentTotal === leader.total && plusMinus > leader.plusMinus) || 
                            (currentTotal === leader.total && plusMinus === leader.plusMinus && fgp > leader.fgp)) {
                                leader.total = currentTotal;
                                leader.player1Id = playerId;
                                leader.teamId = teamId;
                                leader.plusMinus = plusMinus;
                                leader.fgp = fgp;
                                leader.player2Id = undefined;
                                leader.statsBP1 = [points, assists, totReb, steals, blocks, turnovers, plusMinus, fgp];
                            } else if (currentTotal === leader.total && plusMinus === leader.plusMinus && fgp === leader.fgp) {
                                leader.player2Id = playerId;
                                leader.statsBP2 = [points, assists, totReb, steals, blocks, turnovers, plusMinus, fgp];
                            }
                        } 
                        // console.log('leader', leader, teamId, matchDay[team]['gameId']);
                    }) 

                    //get name of the best player of the game
                    // console.log(leader.player1Id, matchDay[team]['gameId']);

                    //check if data from API has playerID
                    if (!leader.player1Id) {
                        console.log(`There is no playerID in game ${matchDay[team]['gameId']} stats!`);
                        return 0;
                    }
                    let bestPlayer1 = await getNameByPlayerID(leader.player1Id);
                    // console.log('bestPlayer1', bestPlayer1.api.players);

                    //post or update player awards number
                    // console.log('player: ', leader.player1Id)
                    // await database.postPlayer(leader.player1Id, `${bestPlayer1.api.players[0].firstName} ${bestPlayer1.api.players[0].lastName}`, team);

                    matchDay[team]['bestPl1'] = bestPlayer1.api.players[0].playerId;
                    matchDay[team]['statsBP1'] = leader.statsBP1;

                    //get photo of player from nba-players.herokuapp.com in png
                    // let photo = await getPhotoByName (bestPlayer1.api.players[0].lastName, bestPlayer1.api.players[0].firstName);
                    // matchDay[team]['player1Photo'] = photo;
                    // console.log ('photo', photo);
                    
                    // console.log(matchDay);
                    
                    // console.log(leader);
                    if (!!leader.player2Id) {
                        let bestPlayer2 = await getNameByPlayerID(leader.player2Id);
                        // console.log(bestPlayer2.api.players);

                        //post or update player awards number
                        // await database.postPlayer(leader.player2Id, `${bestPlayer2.api.players[0].firstName} ${bestPlayer2.api.players[0].lastName}`, team);

                        matchDay[team]['bestPl2'] = `${bestPlayer2.api.players[0].firstName} ${bestPlayer2.api.players[0].lastName}`;
                        matchDay[team]['statsBP2'] = leader.statsBP2;

                        // let photo = await getPhotoByName (bestPlayer2.api.players[0].lastName, bestPlayer2.api.players[0].firstName);
                        // matchDay[team]['player2Photo'] = photo;
                        // console.log ('photo', photo);
                        // console.log(matchDay);
                    } else {
                        matchDay[team]['bestPl2'] = 'N/A';
                    }

                    const {score, gameId, losingTeamID, bestPl1, bestPl2, statsBP1, statsBP2} = matchDay[team];

                    //post a game info
                    await database.postGame(date, gameId, team, losingTeamID, bestPl1, bestPl2, score, statsBP1, statsBP2);
                } else {
                    console.log(`There is no stats of game ${matchDay[team]['gameId']} for ${matchDay[team]['teams']}!!!!!`);
                    return 0;
                }    
            }
            console.log('DONE!'); 
            return dayCount;
        }
        console.log(`We got junky object from API on ${date}!`);
        return 0;
    }
    console.log(`There is no game played in ${date}`);
    return 0;   
};

module.exports = getDayLeaders;