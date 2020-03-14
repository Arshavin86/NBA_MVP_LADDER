const players = require('../models/players')

module.exports = {
  getPlayers,
  getPlayer
}
async function getPlayers (req, res) {
  // const image = await getImages ('Lebron', 'James');
  // const data = {image: image}
  // res.status(200).send(data);
  try {
    const allPlayers = await players.getPlayers()
    res.status(200).send(allPlayers)
  } catch (error) {
    console.log('getPlayers failed: ', error)
  }

  // //function to add player photo to each player
  // const addImage = async data => {
  //   try {
  //     await asyncForEach(data, async player => {
  //       const image = await getImages (player.firstname, player.lastname);
  //       player['image'] = image;
  //     });
  //     // console.log('Number of players: ', data.length)
  //     res.status(200).send(data);
  // } catch (e) {
  //   console.log(e);
  // }
  // }

  // addImage(data);
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
