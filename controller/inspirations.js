const express = require('express') //connecting to express
const router = express.Router()

//conect my Schema to this file
const Wardrobe = require('../models/wardrobe.js')
const Inspiration = require('../models/inspiration.js')


//Index Route 
router.get('/', async (req, res) => {
    try {
        const foundInspirations = await Inspiration.find({})
        const foundWardrobes = await Wardrobe.find({})
        res.render('inspirations/index.ejs', { 
            inspiration: foundInspirations,
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
    res.render('inspirations/new.ejs', {
        id: wardrobeId
    })
})


//Show Route 
router.get('/:id', async (req, res) => {
    try {
        const wardrobeId = req.params.id
        const foundWardrobeInspiration = await Wardrobe.findById(req.params.id).populate('inspirations')
        res.render('inspirations/show.ejs', {
            wardrobe: foundWardrobeInspiration,
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
        const foundInspiration = await Inspiration.findById(req.params.id)

        res.render('inspirations/edit.ejs', {
            inspiration: foundInspiration
        })
    } catch (error) {
        console.log("ERROR ON EDIT REQUEST: ", error)
        res.status(500).send(error)
        console.log(error)
    }
})


//CREATE ROUTE 
router.post('/:id/add', async (req, res) => {
    const wardrobeId = req.params.id
    console.log(wardrobeId)
    try {
        const inspirationInfo = req.body

        const newInspiration = new Inspiration ({
            name: inspirationInfo.name,
            img: inspirationInfo.img,
            description: inspirationInfo.description,
            link: inspirationInfo.link,
            wardrobe: wardrobeId
        })

        await newInspiration.save()

        const wardrobe = await Wardrobe.findById(wardrobeId).populate("inspirations")
        console.log(`this is the the id ` + wardrobe)
       
        wardrobe.inspirations.push(newInspiration.id)
        await wardrobe.save()

        res.redirect(`/inspiration/${wardrobeId}`)
    } catch (error) {
        console.log("ERROR ON CREATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//PUT route 
router.put('/:id', async (req, res) => {
    try {
        const inspirationId = req.params.id
        console.log(inspirationId)
        const inspoToUpdate = {
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            link: req.body.link
        }
       const updatedInspiration = await Inspiration.findByIdAndUpdate(inspirationId, inspoToUpdate, {new:true})
       console.log("UPDATED INSPIRATION: " + updatedInspiration)
        res.redirect(`/stylemate`)
    } catch (error) {
        console.log("ERROR ON UPDATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const inspirationId = req.params.id
        const inspiration = await Inspiration.findByIdAndDelete(inspirationId)
        console.log("Deleted Inpiration: " + inspiration)
        res.redirect(`/stylemate`)
    } catch (error){
        console.log("ERROR ON DELETE REQUEST: ", error)
        res.status(500).send(error)
    }
})


module.exports = router