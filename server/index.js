const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const port = 3000;
const {getGamesByDate} = require('../helpers/rapidapi')
// const unirest = require('unirest');
// const config = require('../config/api-nba-v1.p.js');


app.use(cors());
app.options('*', cors());
app.use('/', express.static('public'));
app.use(/\/\d+\//, express.static('public'));

app.get('/api/games/date/:date', jsonParser, (req, res) => {
  let id = req.params.date;
  console.log(id);
  getGamesByDate(id)
  .then(games => console.log('games in index.js: ', games))
  .catch(err => console.log(err))


//   unirest.get(`https://api-nba-v1.p.rapidapi.com/players/playerId/${id}`)
//     .header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
//     .header("X-RapidAPI-Key", config.X_RapidAPI_Key)
//     .end(result => {
//         console.log(result.body.api.players);
//         res.status(200).send(result);
//     })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});