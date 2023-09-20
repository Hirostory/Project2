const express = require('express') //connecting to express
const router = express.Router()

//conect my Schema to this file
const Wardrobe = require('../models/wardrobe.js')
const Shoe = require('../models/shoe.js')


//Index Route 
router.get('/', async (req, res) => {
    try {
        const foundShoes = await Shoe.find({})
        const foundWardrobes = await Wardrobe.find({})
        res.render('shoes/index.ejs', { 
            shoe: foundShoes,
            wardrobe: foundWardrobes
         })
      } catch (error) {
        console.log("ERROR ON SHOW REQUEST: ", error)
        res.status(500).send(error)
    }
    })

//New Route
router.get('/:id/new', (req, res) => {
    const wardrobeId = req.params.id
    res.render('shoes/new.ejs', {
        id: wardrobeId
    })
})


//Show Route 
router.get('/:id', async (req, res) => {
    try {
        const wardrobeId = req.params.id
        const foundWardrobeShoe = await Wardrobe.findById(req.params.id).populate('shoes')
        res.render('shoes/show.ejs', {
            wardrobe: foundWardrobeShoe,
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
        const foundShoe = await Shoe.findById(req.params.id)

        res.render('shoes/edit.ejs', {
            shoe: foundShoe
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
        const shoeInfo = req.body

        const newShoe = new Shoe ({
            name: shoeInfo.name,
            img: shoeInfo.img,
            description: shoeInfo.description,
            link: shoeInfo.link,
            wardrobe: wardrobeId
        })

        await newShoe.save()

        const wardrobe = await Wardrobe.findById(wardrobeId).populate("shoes")
        console.log(`this is the the id ` + wardrobe)
       
        wardrobe.shoes.push(newShoe.id)
        await wardrobe.save()

        res.redirect(`/shoe/${wardrobeId}`)
    } catch (error) {
        console.log("ERROR ON CREATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//PUT route 
router.put('/:id', async (req, res) => {
    try {
        const shoeId = req.params.id
        console.log(shoeId)
        const shoeToUpdate = {
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            link: req.body.link
        }
       const updatedShoe = await Shoe.findByIdAndUpdate(shoeId, shoeToUpdate, {new:true})
       console.log("UPDATED TOP: " + updatedShoe)
        res.redirect(`/stylemate`)
    } catch (error) {
        console.log("ERROR ON UPDATE REQUEST: ", error)
        res.status(500).send(error)
    }
})

//DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const shoeId = req.params.id
        const shoe = await Shoe.findByIdAndDelete(shoeId)
        console.log("Deleted Shoe: " + shoe)
        res.redirect(`/stylemate`)
    } catch (error){
        console.log("ERROR ON DELETE REQUEST: ", error)
        res.status(500).send(error)
    }
})


module.exports = router