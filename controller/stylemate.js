const express = require('express') //connecting to express
const router = express.Router()

//conect my Schema to this file
const Wardrobe = require('../models/wardrobe.js')
 
//the index route - GET
router.get('/', async (req, res) => {
    // res.send('welcome to StyleMate')
    const foundWardrobes = await Wardrobe.find()
    console.log(foundWardrobes)
    res.render('index.ejs', {
        wardrobes: foundWardrobes
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
    const foundWardrobe = await Wardrobe.findById(req.params.id)
    res.render('show.ejs', {
        wardrobe: foundWardrobe
    })
})

//the edit route - GET
router.get('/:id/edit', async (req, res) =>{
    // res.send('edit is working')
    const foundWardrobe = await Wardrobe.findById(req.params.id)
    res.render('edit.ejs', {
        wardrobe: foundWardrobe
    })
})

//the create route - POST
router.post('/', async (req, res) => {
    try{
        const newWardrobe = await Wardrobe.create(req.body)
        res.redirect('/stylemate')
        console.log(newWardrobe)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

//the update route - PUT
router.put('/:id', async (req, res) => {
    try{
        console.log("UPDATE REQ.BODY:", req.body)
        const updatedWardrobe = await Wardrobe.findByIdAndUpdate(req.params.id, req.body, {new:true}) // 
        // const { title, top, bottom, shoe, inspiration } = req.body

        // const updatedWardrobe = await Wardrobe.findByIdAndUpdate(
        //     req.params.id,
        //     {
        //         title,
        //         top,
        //         bottom,
        //         shoe,
        //         inspiration
        //     },
        //     { new: true }
        // )
        console.log("UPDATED WARDROBE:", updatedWardrobe)
        res.redirect(`/stylemate/${req.params.id}`)
    } catch (error) {
        console.log("ERROR ON UPDATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//the delete route - DELETE
router.delete('/:id', async (req, res) => {
    try{
        const wardrobe = await Wardrobe.findByIdAndDelete(req.params.id)
        console.log(`Deleted Wardrobe: ${wardrobe}`)
        res.redirect('/stylemate')
    } catch (error) {
        console.log("ERROR ON DELETE REQUEST: ", error)
        res.status(500).send(error)
    }
})

module.exports = router