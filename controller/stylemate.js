const express = require('express') //connecting to express
const router = express.Router()

//conect my Schema to this file
const Item = require('../models/stylemate.js')
 
//the index route - GET
router.get('/', async (req, res) => {
    // res.send('welcome to StyleMate')
    const foundItem = await Item.find()
    console.log(foundItem)
    res.render('index.ejs', {
        item: foundItem
    })
})

//the new route - GET
router.get('/new', (req, res) => {
    // res.send('New page is working')
    res.render('new.ejs')
})

//the show route - GET
router.get('/:id', async (req, res) => {
    // res.send('show route is working')
    const foundItem = await Item.findById(req.params.id)
    res.render('show.ejs', {
        item: foundItem
    })
})

//the edit route - GET
router.get('/:id/edit', async (req, res) =>{
    // res.send('edit is working')
    const foundItem = await Item.findById(req.params.id)
    res.render('edit.ejs', {
        item: foundItem
    })
})

//the create route - POST
router.post('/', async (req, res) => {
    try{
        const newItem = await Item.create(req.body)
        res.redirect('/stylemate')
    } catch (error) {
        console.log(err)
        res.status(500).send(error)
    }
})

//the update route - PUT
router.put('/:id', async (req, res) => {
    try{
        const updatedItem = await Item.findByIdAndUpdate
        (req.params.id, req.body, { new: true })
        res.redirect(`/store/${req.params.id}`)
    } catch (error) {
        console.log("ERROR ON DELETE REQUEST: ", err)
        res.status(500).send(error)
    }
})

//the delete route - DELETE

module.exports = router