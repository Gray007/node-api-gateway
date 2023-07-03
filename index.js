const express = require('express')
const app = express()
const omdbRouter = require('./controllers/omdb')
const config = require('./utils/config')

app.use('/api/omdb', omdbRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Internal Server Error' })
})

const PORT = config.PORT || 3030
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})