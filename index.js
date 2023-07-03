const express = require('express')
const app = express()

// Middleware
app.use(express.json()) // Parse JSON request bodies

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Tom' },
        { id: 3, name: 'Bob' }
    ]
    res.json(users)
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Internal Server Error' })
})

// Start the server
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})