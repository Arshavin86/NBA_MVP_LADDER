const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  serverHost: process.env.SERVER_HOST || 'http://localhost:3001',
  X_RapidAPI_Key: process.env.X_RapidAPI_Key,
  databaseConfig: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    database: process.env.DB || 'nba',
    password: process.env.DB_PASSWORD
  },
  newsApiKey: process.env.NEWS_API_KEY,
  youtube: {
    API_Key: process.env.YOUTUBE_API_KEY,
    CLIENT_ID: process.env.YOUTUBE_CLIENT_ID,
    CLIENT_SECRET: process.env.YOUTUBE_CLIENT_SECRET,
    REDIRECT_URL: process.env.YOUTUBE_REDIRECT_URL || 'http://localhost:3000'
  }
}
