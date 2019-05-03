const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const port = 3000;
const {getGamesByDate, getStatsByGameID} = require('../helpers/rapidapi')
const {statsCalculator} = require('../helpers/statsCalculater'); 

app.use(cors());
app.options('*', cors());
app.use('/', express.static('public'));
app.use(/\/\d+\//, express.static('public'));     

app.get('/api/games/date/:date', jsonParser, (req, res) => {
    let id = req.params.date;
    console.log(id);
    (function getDayLeaders() {
        let teamID;
        let gameID;
        let leaders = [];
        let gameWinners = [];
        // get all games played on one particular date
        getGamesByDate(id)
        .then(games => {
            console.log(games.api.games);
            // find gameId and id of winning team for each game
            games.api.games.forEach((game) => {
                if(game.vTeam.score.points > game.hTeam.score.points) {
                    teamID = game.vTeam.teamId;
                } else {
                    teamID = game.hTeam.teamId;
                }
                    gameID = game.gameId;
                    console.log('teamID: ', teamID, 'gameID: ', gameID);
                    gameWinners.push([gameID, teamID]);
            })
            return gameWinners;
        })
        .then(gameWinners => {
            console.log(gameWinners);
            gameWinners.forEach(game => {
                //get stats for each game
                getStatsByGameID(game[0])
                .then(players => {
                    let leader = {
                        player1Id: undefined,
                        team1Id: undefined,
                        total: 0,
                        plusMinus: 0,
                        fgp: 0,
                        player2Id: undefined,
                        team2Id: undefined,
                    };
                    let currentTotal;
                    //calculate stats of each player from winning team and compare it with current best result for current game
                    players.api.statistics.forEach( (player, index) => {
                        const {points, assists, totReb, steals, blocks, turnovers, plusMinus, fgp, playerId, teamId} = player;
                        if(teamId === game[1]) {
                            currentTotal = statsCalculator(points, assists, totReb, steals, blocks, turnovers);
                            console.log('total: ', currentTotal);
                            if (currentTotal > leader.total || (currentTotal === leader.total && plusMinus > leader.plusMinus) || 
                            (currentTotal === leader.total && plusMinus === leader.plusMinus && fgp > leader.fgp)) {
                                leader.total = currentTotal;
                                leader.player1Id = playerId;
                                leader.team1Id = teamId;
                                leader.plusMinus = plusMinus;
                                leader.fgp = fgp;
                                player2Id = undefined;
                            } else if (currentTotal === leader.total && plusMinus === leader.plusMinus && fgp === leader.fgp) {
                                leader.player2Id = playerId;
                                leader.team2Id = teamId;
                            }
                        } 
                        console.log(leaders, index, teamId, game[1]);
                    }) 
                    leaders.push(leader);
                    console.log(leaders);
                })
            })
        })
    })();   
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});