const mongoose = require('mongoose')


//created a model 
const wardrobeSchema = new mongoose.Schema({
    title: {
        name: String,
        img: String, 
    },
    tops: [{
        name: String,
        img: String,
        description: String,
        link: String, 
    }],
    bottoms: [{
        name: String,
        img: String,
        description: String,
        link: String, 
    }],
    shoes: [{
        name: String,
        img: String,
        description: String,
        link: String, 
    }],
    inspirations: [{
        name: String,
        img: String,
        description: String,
    }]
})

const Wardrobe = mongoose.model("Wardrobe", wardrobeSchema)

module.exports = Wardrobe
