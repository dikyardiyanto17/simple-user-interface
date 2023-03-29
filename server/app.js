const cors = require('cors')
require('dotenv').config()
const express = require('express')
const errorHandler = require('./middlewares/errorHandlers')
const connect = require('./config/mongodb')
const mongoose = require('mongoose');
const router = require('./routes')
const app = express()
const port = 3000

connect()

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.use(errorHandler)

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log("App on port " + port)
    })
})