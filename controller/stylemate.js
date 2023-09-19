const express = require('express') //connecting to express
const router = express.Router()

//conect my Schema to this file
const { default: mongoose } = require('mongoose')
const Wardrobe = require('../models/wardrobe.js')
const Top = require('../models/top.js')
const Bottom = require('../models/bottom.js')
const Shoe = require('../models/shoe.js')
const Inspiration = require('../models/inspiration.js')

 
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
    try {
        const foundWardrobe = await Wardrobe.findById(req.params.id)
        .populate('tops')
        .populate('bottoms')
        .populate('shoes')
        .populate('inspirations')
        .exec()

        res.render('show.ejs', {
            wardrobe: foundWardrobe
        })
    } catch (error) {
        console.log("ERROR ON SHOW REQUEST: ", error)
        res.status(500).send(error)
    }
})

//the edit route - GET
router.get('/:id/edit', async (req, res) =>{
    // res.send('edit is working')
    const foundWardrobe = await Wardrobe.findById(req.params.id)
    res.render('edit.ejs', {
        wardrobe: foundWardrobe
    })
})

//the create route - POST - redirect to the main page... we'll see lmao 
router.post('/', async (req, res) => {

    const title = req.body.title;
    const tops = req.body.tops;
    const bottoms = req.body.bottoms;
    const shoes = req.body.shoes;
    const inspirations = req.body.inspirations;

    try{
        // creating new tops, bottoms, shoes, and inspirations
        const addTops = await Top.create(tops)
        const addBottoms = await Bottom.create(bottoms)
        const addShoes = await Shoe.create(shoes)
        const addInspiration = await Inspiration.create(inspirations)
        //creating a wardrobe 
        const newWardrobe = await Wardrobe.create({
            title,
            tops: addTops,
            bottoms: addBottoms,
            shoes: addShoes,
            inspirations: addInspiration
        })
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
        // const updatedWardrobe = await Wardrobe.findByIdAndUpdate(req.params.id, req.body, {new:true})
        const updatedWardrobe = await Wardrobe.findByIdAndUpdate(req.params.id,
            {
                title: req.body.title,
                tops: req.body.tops.map(top => mongoose.Types.ObjectId(top)),
                bottoms: req.body.bottoms.map(bottom => mongoose.Types.ObjectId(bottom)), 
                shoes: req.body.shoes.map(shoe => mongoose.Types.ObjectId(shoe)), 
                inspirations: req.body.inspirations.map(inspiration => mongoose.Types.ObjectId(inspiration))
            }, 
            {new: true}
        )
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