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
        // const newItem = await Item.create(req.body)
        const { title, top, bottom, shoe, inspiration } = req.body
        
        const newItem = await Item.create({
            title,
            top,
            bottom,
            shoe,
            inspiration
        })
        res.redirect('/stylemate')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

//the update route - PUT
router.put('/:id', async (req, res) => {
    try{
        // const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new:true})
        const { title, top, bottom, shoe, inspiration } = req.body

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {
                title,
                top,
                bottom,
                shoe,
                inspiration
            },
            { new: true }
        )
        console.log(updatedItem)
        res.redirect(`/stylemate/${req.params.id}`)
    } catch (error) {
        console.log("ERROR ON UPDATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//the delete route - DELETE
router.delete('/:id', async (req, res) => {
    try{
        const item = await Item.findByIdAndDelete(req.params.id)
        console.log(`Deleted Item: ${item}`)
        res.redirect('/stylemate')
    } catch (error) {
        console.log("ERROR ON DELETE REQUEST: ", error)
        res.status(500).send(error)
    }
})

module.exports = router