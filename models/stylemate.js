const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title: {
        name: String,
        img: String, 
    },
    top: {
        name: String,
        img: String,
        description: String,
        link: String, 
    },
    bottom: {
        name: String,
        img: String,
        description: String,
        link: String, 
    },
    shoe: {
        name: String,
        img: String,
        description: String,
        link: String, 
    },
    inspiration: {
        name: String,
        img: String,
        description: String,
    }
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item