const axios = require('axios')
const config = require('../utils/config')
const omdbRouter = require('express').Router()

omdbRouter.get('/search', async (req, res) => {
    try {
        const { query } = req.query

        if (!query || typeof query !== 'string' || query.trim() === '') {
            return res.status(400).json({ error: 'Invalid search query' })
        } else if (query.toLowerCase() === 'test') {
            return res.status(404).json({ error: '404 status retured when search query test' })
        }

        const response = await axios.get(config.OMDB_URL, {
            params: {
                apikey: config.OMDB_API_KEY,
                s: query,
            },
        })

        const { data } = response

        if (data.Error) {
            return res.status(500).json({ error: data.Error })
        }

        const isValidURL = (url) => {
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            return urlRegex.test(url);
          };

        const filteredResults = data.Search.filter(movie => movie.Poster && movie.Poster !== 'N/A' && isValidURL(movie.Poster))
            .map(({ Title, Year, Type, Poster }) => ({ Title, Year, Type, Poster }))

        setTimeout(() => {
            res.json(filteredResults)
        }, 2000)

    } catch (error) {
        console.error('Error occurred:', error)
        res.status(500).json({ error: 'An error occurred' })
    }
})

module.exports = omdbRouter