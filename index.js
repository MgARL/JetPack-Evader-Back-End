// Import dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// ENV Vars
const PORT = process.env.PORT || 3001
const DEV_URL =  process.env.DEV_URL
const JETPACK_URL =  process.env.JETPACK_URL

// MiddleWare

// cors
app.use(
    cors({
        origin: [JETPACK_URL, DEV_URL],
    })
)

// body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes

app.use('/scores', require('./controllers/scores'))

app.get('*', (req,res) =>{
    res.status(404).send('PAGE NOT FOUND')
})

// Starting App

app.listen(PORT, () => console.log(`listening to port: ${PORT}`))