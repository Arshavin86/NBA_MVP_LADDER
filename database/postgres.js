const promise = require('bluebird');

const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);
// const databaseConfig = require ('../config/database');

const databaseConfig = {
  host: 'localhost',
  port: 5432,
  user: 'andrei',
  database: 'nba',
  password: 'privet',
};

const db = pgp(databaseConfig);

db.connect()
  .then((obj) => {
    console.log('connected to PostgreSQL');
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log('ERROR:', error.message || error);
  });

module.exports = { db };
