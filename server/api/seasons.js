const seasons = require('../models/seasons')

module.exports = {
  getSeasons
}

async function getSeasons (req, res) {
  const id = req.params.query
  const queryArray = id.split('-')
  const year = Number(queryArray[1])
  try {
    const list = await seasons.getSeasons({ queryArray, year })
    res.status(200).send(list)
  } catch (error) {
    console.log('getSeasons failed: ', error)
  }
}
