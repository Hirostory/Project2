const mongoose = require('mongoose')
const Schema = mongoose.Schema

//created a model 
const wardrobeSchema = new mongoose.Schema({
    title: {
        name: String,
        img: String, 
    },
    tops: [{
         type: mongoose.Types.ObjectId,
         ref: "Top"
    }],
    bottoms: [{
        type: mongoose.Types.ObjectId,
        ref: "Bottom"
    }],
    shoes: [{
        type: mongoose.Types.ObjectId,
        ref: "Shoe"
    }],
    inspirations: [{
        type: mongoose.Types.ObjectId,
        ref: "Inspiration"
    }]
})

const Wardrobe = mongoose.model("Wardrobe", wardrobeSchema)

module.exports = Wardrobe
