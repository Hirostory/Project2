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
router.get('/:topId/edit', async (req, res) => {
    try {
        const topId = req.params.topId

        const foundTop = await Top.findById(topId)
        const foundWardrobe = await Wardrobe.findById(foundTop.wardrobe)
        
        res.render('tops/edit.ejs', {
            wardrobe: foundWardrobe,
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
        const topId = req.params.topId

        const foundTop = await Top.findById(topId)

        foundTop.name = req.body['tops[name]']
        foundTop.img = req.body['tops[img]']
        foundTop.description = req.body['tops[description]']
        foundTop.link = req.body['tops[link]']

        await foundTop.save()

        res.redirect(`/tops/${foundTop.wardrobe}`)
    } catch (error) {
        console.log("ERROR ON UPDATE REQUEST: ", error)
        res.status(500).send(error)
    }
})
module.exports = router