const express = require('express') //connecting to express
const router = express.Router()

//conect my Schema to this file
const Wardrobe = require('../models/wardrobe.js')
const Top = require('../models/top.js')


//Index Route 
router.get('/', async (req, res) => {
    try {
        const foundTops = await Top.find({})
        const foundWardrobes = await Wardrobe.find({})
        res.render('tops/index.ejs', { 
            top: foundTops,
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
    res.render('tops/new.ejs', {
        id: wardrobeId
    })
})


//Show Route 
router.get('/:id', async (req, res) => {
    try {
        const wardrobeId = req.params.id
        const foundWardrobeTop = await Wardrobe.findById(req.params.id).populate('tops')
        res.render('tops/show.ejs', {
            wardrobe: foundWardrobeTop,
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
        const foundTop = await Top.findById(req.params.id)

        res.render('tops/edit.ejs', {
            top: foundTop
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
        const topInfo = req.body

        const newTop = new Top ({
            name: topInfo.name,
            img: topInfo.img,
            description: topInfo.description,
            link: topInfo.link,
            wardrobe: wardrobeId
        })

        await newTop.save()

        const wardrobe = await Wardrobe.findById(wardrobeId).populate("tops")
        console.log(`this is the the id ` + wardrobe)
       
        wardrobe.tops.push(newTop.id)
        await wardrobe.save()

        res.redirect(`/top/${wardrobeId}`)
    } catch (error) {
        console.log("ERROR ON CREATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//PUT route 
router.put('/:id', async (req, res) => {
    try {
        const topId = req.params.id
        console.log(topId)
        const topToUpdate = {
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            link: req.body.link
        }
       const updatedTop = await Top.findByIdAndUpdate(topId, topToUpdate, {new:true})
       console.log("UPDATED TOP: " + updatedTop)
        res.redirect(`/top`)
    } catch (error) {
        console.log("ERROR ON UPDATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const topId = req.params.id
        const top = await Top.findByIdAndDelete(topId)
        console.log("Deleted Top: " + top)
        res.redirect(`/top`)
    } catch (error){
        console.log("ERROR ON DELETE REQUEST: ", error)
        res.status(500).send(error)
    }
})


module.exports = router