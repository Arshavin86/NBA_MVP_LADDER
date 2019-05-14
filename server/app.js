const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
 
const database = require('./controllers');

app.use(cors());
app.options('*', cors());
app.use('/', express.static('public'));
app.use(/\/\d+\//, express.static('public'));     

app.get('/api/games/date/:date', jsonParser, (req, res) => {
     database.getGames(req, res);
});

module.exports = app;