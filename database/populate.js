const postgres = require('./postgres');
const { db } = postgres;
const request = require('request-promise');
const config = require('../config/api-nba-v1.p');
const headers = {
    'User-Agent': 'request',
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com', 
    'X-RapidAPI-Key': config.X_RapidAPI_Key
};
const URL = `https://api-nba-v1.p.rapidapi.com`;

const playerAdd = async () => {
    let playerId = 1159;
    try {
        while (playerId < 1845) {
            const options = {
                url: `${URL}/players/playerId/${playerId}`,
                headers: headers,
                json: true
            };
            const res = await request(options);

            //avoid query player from WNBA
            if (res.api.players[0].leagues.standard) {
                const {teamId, firstName, lastName, yearsPro, collegeName, country, dateOfBirth, affiliation, heightInMeters, weightInKilograms, startNba} = res.api.players[0];
                const {jersey, active, pos}= res.api.players[0].leagues.standard;
                
                //avoid query not NBA player or with no teamId in his profile
                const team = await db.query('SELECT * FROM team WHERE teamID = $1', teamId);
                if (team.length) {
                        const qr = 'INSERT INTO player (playerID, teamID, firstName, lastName, yearsPro, collegeName, country, dateOfBirth, affiliation, heightInMeters, weightInKilograms, startNba, pos, jersey, active) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15';
                        const result = await db.query(qr, [playerId, teamId, firstName, lastName, yearsPro, collegeName, country, dateOfBirth, affiliation, heightInMeters, weightInKilograms, startNba, pos, jersey, active]);  
                        console.log('ID passed: ', playerId);
                } else {
                    console.log('ID banned: ', playerId);
                }
            } else {
                console.log('He is a female!!');
            }
            playerId ++;
        }
        console.log('Done');
    } catch (e) {
        console.log(e);
    }
    
    // let data = await db.query('SELECT game.*, team.name, team.logo FROM game INNER JOIN team ON game.winningteamid = team.teamID WHERE date = $1', id);
  
};

playerAdd();



//1844