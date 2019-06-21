const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const {getNews} = require('../api/news');
const {getVideos} = require('../api/youtube');


const database = require('../database/controllers');

app.use(cors());
app.options('*', cors());
app.use('/', express.static('public'));
app.use(/\/\d+\//, express.static('public'));     

app.get('/api/games/date/:date', jsonParser, (req, res) => {
     database.getGames(req, res);
});

app.get('/api/news/:query', jsonParser, (req, res) => {
     getNews(req, res);
})

app.get('/api/videos/:query', jsonParser, (req, res) => {
     getVideos(req, res);
})

app.get('/api/players', jsonParser, (req, res) => {
     database.getPlayers(req, res);
})


module.exports = app;