require('dotenv').config()

const PORT = process.env.PORT
const OMDB_API_KEY = process.env.OMDB_API_KEY
const OMDB_URL = process.env.OMDB_URL

module.exports = {
    PORT,
    OMDB_API_KEY,
    OMDB_URL
}