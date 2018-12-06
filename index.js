const express = require('express')
const body_parser = require('body-parser')
const app = express()
const path = require('path')

app.use(body_parser.json())

const secured = express.Router()
secured.use(require('./private/validation'))
require('./private/routes/secured')(secured)

const public = express.Router()
require('./private/routes/public')(public)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/build/index.html'))
})

app.use(express.static(path.join(__dirname, 'public/build')))

app.use('/api', secured)
app.use('/auth', public)
app.listen(8000)
