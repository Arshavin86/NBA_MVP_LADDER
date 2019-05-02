const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const port = 3000;
const unirest = require('unirest');
const config = require('../config/api-nba-v1.p.js');


app.use(cors());
app.options('*', cors());
app.use('/', express.static('public'));
app.use(/\/\d+\//, express.static('public'));

app.get('/api/players/playerId/:id', jsonParser, (req, res) => {
  let id = req.params.id;
  console.log(id);

  unirest.get(`https://api-nba-v1.p.rapidapi.com/players/playerId/${id}`)
    .header("X-RapidAPI-Host", "api-nba-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", config.X_RapidAPI_Key)
    .end(result => {
        res.status(200).send(result);
    })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});