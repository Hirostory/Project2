const express = require('express') //connecting to express
const router = express.Router()

//conect my Schema to this file
const Item = require('../models/stylemate.js')
 
//the index route - GET
router.get('/', async (req, res) => {
    // res.send('welcome to StyleMate')
    const foundItem = await Item.find()
    console.log(foundItem)
    res.render('index.ejs')
})

//the new route - GET
router.get('/new', (req, res) => {
    // res.send('New page is working')
    res.render('new.ejs')
})

//the show route - GET
router.get('/:id', async (req, res) => {
    // res.send('show route is working')
    // const foundItem = await Item.findById(req.params.id)
    res.render('show.ejs')
})

//the edit route - GET
router.get('/:id/edit', async (req, res) =>{
    // res.send('edit is working')
    // const foundItem = await Item.findById(req.params.id)
    res.render('edit.ejs')
})

//the create route - POST

//the update route - PUT

//the delete route - DELETE

module.exports = router