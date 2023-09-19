const mongoose = require('mongoose')


//created a model 
const shoeSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    link: String,
    wardrobe: {
        type: mongoose.Types.ObjectId,
        ref: "Wardrobe"
    }
})
const Shoe = mongoose.model("Shoe", shoeSchema)

module.exports = Shoe