const { searchYouTubeForGames, searchYouTubeForPlayer } = require('../external-requests/youtube')

module.exports = {
  getGameVideos,
  getPlayerVideos
}

async function getGameVideos (req, res) {
  const query = req.params.query.slice(0, -10)

  // get finish date for search
  const dateFinish = req.params.query.slice(-10)
  const dFN = new Date(dateFinish)
  dFN.setDate(dFN.getDate() + 1)

  // get start date for search
  const dateStart = new Date(dateFinish)
  dateStart.setDate(dateStart.getDate() - 1)
  const dST = new Date(dateStart)

  const StartISO = dST.toISOString()
  const FinishISO = dFN.toISOString()

  try {
    const response = await searchYouTubeForGames(query, StartISO, FinishISO)
    res.status(200).send(response)
  } catch (e) {
    console.log(e)
  }
}

async function getPlayerVideos (req, res) {
  const query = req.params.query

  try {
    const response = await searchYouTubeForPlayer(query)
    res.status(200).send(response)
  } catch (e) {
    console.log(e)
  }
}
