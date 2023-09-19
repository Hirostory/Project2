const express = require('express') //connecting to express
const router = express.Router()

//conect my Schema to this file
const Wardrobe = require('../models/wardrobe.js')
const Bottom = require('../models/bottom.js')


//Index Route 
router.get('/', async (req, res) => {
    try {
        const foundBottoms = await Bottom.find({})
        const foundWardrobes = await Wardrobe.find({})
        res.render('bottoms/index.ejs', { 
            bottom: foundBottoms,
            wardrobe: foundWardrobes
         })
      } catch (error) {
        console.log("ERROR ON SHOW REQUEST: ", error)
        res.status(500).send(error)
    }
    })

//New Roure
router.get('/:id/new', (req, res) => {
    const wardrobeId = req.params.id
    res.render('bottoms/new.ejs', {
        id: wardrobeId
    })
})


//Show Route 
router.get('/:id', async (req, res) => {
    try {
        const wardrobeId = req.params.id
        const foundWardrobeBottom = await Wardrobe.findById(req.params.id).populate('bottoms')
        res.render('bottoms/show.ejs', {
            wardrobe: foundWardrobeBottom,
            id: wardrobeId
        })
    } catch (error) {
        console.log("ERROR ON SHOW REQUEST: ", error)
        res.status(500).send(error)
    }
})

//EDIT Route
router.get('/:id/edit', async (req, res) => {
    try {
        const foundBotoom = await Bottom.findById(req.params.id)

        res.render('bottoms/edit.ejs', {
            bottom: foundBotoom
        })
    } catch (error) {
        console.log("ERROR ON EDIT REQUEST: ", error)
        res.status(500).send(error)
    }
})


//CREATE ROUTE 
router.post('/:id/add', async (req, res) => {
    const wardrobeId = req.params.id
    console.log(wardrobeId)
    try {
        const bottomInfo = req.body

        const newBottom = new Bottom ({
            name: bottomInfo.name,
            img: bottomInfo.img,
            description: bottomInfo.description,
            link: bottomInfo.link,
            wardrobe: wardrobeId
        })

        await newBottom.save()

        const wardrobe = await Wardrobe.findById(wardrobeId).populate("bottoms")
        console.log(`this is the the id ` + wardrobe)
       
        wardrobe.bottoms.push(newBottom.id)
        await wardrobe.save()

        res.redirect(`/bottom/${wardrobeId}`)
    } catch (error) {
        console.log("ERROR ON CREATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//PUT route 
router.put('/:id', async (req, res) => {
    try {
        const bottomId = req.params.id
        console.log(bottomId)
        const bottomToUpdate = {
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            link: req.body.link
        }
       const updatedTop = await Bottom.findByIdAndUpdate(bottomId, bottomToUpdate, {new:true})
       console.log("UPDATED Top: " + updatedTop)
        res.redirect(`/bottom`)
    } catch (error) {
        console.log("ERROR ON UPDATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const bottomId = req.params.id
        const bottom = await Bottom.findByIdAndDelete(bottomId)
        console.log("Deleted Bottom: " + bottom)
        res.redirect(`/bottom`)
    } catch (error){
        console.log("ERROR ON DELETE REQUEST: ", error)
        res.status(500).send(error)
    }
})


module.exports = router