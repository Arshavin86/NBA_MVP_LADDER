const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const cors = require('cors')
const { getNews } = require('./api/news')
const { getGameVideos, getPlayerVideos } = require('./api/youtube')
const { getGames } = require('./api/games')
const { getPlayers, getPlayer } = require('./api/players')
const { getSeasons } = require('./api/seasons')

module.exports = app

app.use(cors())
app.options('*', cors())
app.use('/', express.static('public'))
// app.use(/\/\d+\//, express.static('public'));

app.get('/api/games/date/:date', jsonParser, (req, res) => {
  getGames(req, res)
})

app.get('/api/news/:query', jsonParser, (req, res) => {
  getNews(req, res)
})

app.get('/api/videos/:query', jsonParser, (req, res) => {
  getGameVideos(req, res)
})

app.get('/api/videosPlayer/:query', jsonParser, (req, res) => {
  getPlayerVideos(req, res)
})

app.get('/api/players', jsonParser, (req, res) => {
  getPlayers(req, res)
})

app.get('/api/seasons/:query', jsonParser, (req, res) => {
  getSeasons(req, res)
})

app.get('/api/players/:query', jsonParser, (req, res) => {
  getPlayer(req, res)
})
