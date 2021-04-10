const promise = require('bluebird')

const options = { promiseLib: promise }
const pgp = require('pg-promise')(options)

const { databaseConfig } = require('../config.js')

const db = pgp(databaseConfig)

db.connect()
  .then((obj) => {
    console.log('connected to PostgreSQL')
    obj.done() // success, release the connection;
  })
  .catch((error) => {
    console.error('ERROR:', error.message || error)
  })

module.exports = { db }
