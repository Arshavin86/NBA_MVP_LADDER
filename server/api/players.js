const players = require('../models/players')

module.exports = {
  getPlayers,
  getPlayer
}
async function getPlayers (req, res) {
  try {
    const allPlayers = await players.getPlayers()
    res.status(200).send(allPlayers)
  } catch (error) {
    console.log('getPlayers failed: ', error)
  }
}

async function getPlayer (req, res) {
  const name = req.params.query
  const firstName = name.split(', ')[1]
  const lastName = name.split(',')[0]
  try {
    const player = await players.getPlayer({ firstName, lastName })
    res.status(200).send(player)
  } catch (error) {
    console.log('getPlayer failed: ', error)
  }
}
