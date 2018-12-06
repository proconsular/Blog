const express = require('express')
const body_parser = require('body-parser')
const app = express()

app.use(body_parser.json())

const secured = express.Router()
secured.use(require('./validation'))
require('./routes/secured')(secured)

const public = express.Router()
require('./routes/public')(public)

app.use('/api', secured)
app.use('/auth', public)
app.listen(8000)