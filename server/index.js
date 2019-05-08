const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const port = 3001;
const {getGamesByDate, getStatsByGameID, getNameByPlayerID} = require('../helpers/rapidapi')
const {statsCalculator} = require('../helpers/statsCalculater'); 

app.use(cors());
app.options('*', cors());
app.use('/', express.static('public'));
app.use(/\/\d+\//, express.static('public'));     

app.get('/api/games/date/:date', jsonParser, (req, res) => {
    let id = req.params.date;
    console.log(id);
    (async function getDayLeaders() {
        let teamID;
        let gameID;
        let matchDay = {}
        // get all games played on one particular date
        let games = await getGamesByDate(id);
        // console.log(games.api.games);

        // find gameId and id of winning team for each game
        games.api.games.forEach(game => {
            if(Number(game.vTeam.score.points) > Number(game.hTeam.score.points)) {
                teamID = game.vTeam.teamId;
            } else {
                teamID = game.hTeam.teamId;
            }
            gameID = game.gameId;
            // console.log('teamID: ', teamID, 'gameID: ', gameID);
            matchDay[teamID] = {
                teams: [game.vTeam.fullName, game.hTeam.fullName],
                score: [game.vTeam.score.points, game.hTeam.score.points],
                logos: [game.vTeam.logo, game.hTeam.logo],
                gameId: gameID,
                winningTeamId: teamID,
                bestPlayer: undefined
            }
        });
        //I can't use forEach with async/await so I use a variation of the for-of iteration statement which iterates over async iterable objects
        for await (const game of Object.keys(matchDay)) {
            //get players stats for each game
            let players = await getStatsByGameID(matchDay[game]['gameId'])
            // console.log(players);
            let leader = {
                total: 0,
                plusMinus: 0,
                fgp: 0,
            };
            let currentTotal;
            //calculate stats of each player from winning team and compare it with current best result for current game
            players.api.statistics.forEach( player => {
                // console.log(player);
                const {points, assists, totReb, steals, blocks, turnovers, plusMinus, fgp, playerId, teamId} = player;
                if(teamId === matchDay[game]['winningTeamId']) {
                    currentTotal = statsCalculator(points, assists, totReb, steals, blocks, turnovers);
                    // console.log('total: ', currentTotal);
                    if (currentTotal > leader.total || (currentTotal === leader.total && plusMinus > leader.plusMinus) || 
                    (currentTotal === leader.total && plusMinus === leader.plusMinus && fgp > leader.fgp)) {
                        leader.total = currentTotal;
                        leader.player1Id = playerId;
                        leader.teamId = teamId;
                        leader.plusMinus = plusMinus;
                        leader.fgp = fgp;
                        leader.player2Id = undefined;
                    } else if (currentTotal === leader.total && plusMinus === leader.plusMinus && fgp === leader.fgp) {
                        leader.player2Id = playerId;
                    }
                } 
                // console.log(leader, teamId);
            }) 
            //get name of the best player of the game
            let bestPlayer1 = await getNameByPlayerID(leader.player1Id);
            // console.log(bestPlayer1.api.players);
            Object.keys(matchDay).forEach(game => {
                //match player with the game he played in from matchDay object
                if (matchDay[game]['winningTeamId'] === bestPlayer1.api.players[0].teamId) {
                    matchDay[game]['bestPlayer1'] = [`${bestPlayer1.api.players[0].firstName} ${bestPlayer1.api.players[0].lastName}`];
                }
                // console.log(matchDay);
            })
            console.log(leader);
            if (!!leader.player2Id) {
                let bestPlayer2 = await getNameByPlayerID(leader.player2Id);
                console.log(bestPlayer2.api.players);
                Object.keys(matchDay).forEach(game => {
                    //match player with the game he played in from matchDay object
                    if (matchDay[game]['winningTeamId'] === bestPlayer2.api.players[0].teamId) {
                        matchDay[game]['bestPlayer2'] = [`${bestPlayer2.api.players[0].firstName} ${bestPlayer2.api.players[0].lastName}`];
                    }
                })
            }
        }
        res.status(200).send(matchDay);   
    })();   
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});