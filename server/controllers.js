const postgres = require('../database/postgres');
const { db } = postgres;
const getDayLeaders = require('./api');

exports.getGames = async (req, res) => {
  const id = req.params.date;
  console.log(id);
  try {
    let data = await db.query('SELECT * FROM matchday WHERE date = $1', id);
    console.log('I got data from database: ', data);
    if (data.length) {
      res.status(200).send(data);
    } else {
      getDayLeaders(id);
    }
  }
  catch (error) { 
      console.log('Selecting from db is failed: ', error);
      res.status(500).send(data); 
  };
}

exports.add = (date, IDs) => {
  //use prepared statement:
  let qr = 'INSERT INTO matchday (date, gameids) VALUES ($1, $2)';
  db.query(qr, [date, IDs])
  .then(result => {
    console.log('GameDay is posted on Postgres: ', result)
    // res.send(result).status(201); 
  })
  .catch((error) => {
    console.log('POST is failed: ', error);
    res.send(error).status(500) 
  });
}

// exports.update = (req, res) => {
    
//   };

// exports.delete = (req, res) => {
    
// };