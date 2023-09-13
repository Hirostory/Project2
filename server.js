// IMPORTS
const express = require('express')
const methodOverride = require("method-override")
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 3000

// setup database 
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

// connect to mongo 
mongoose.connect(mongoURI)

const db = mongoose.connection
// optional create status messages to check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})

//importing it to my controller
const styleController = require("./controller/stylemate.js")

//MIDDLEWARE sections 
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/stylemate', styleController)
app.use(express.static('public'))

// app.get('/', (req, res) => {
//    res.send('Hello world!')
// })

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})