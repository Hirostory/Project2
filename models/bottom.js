const mongoose = require('mongoose')


//created a model 
const bottomSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    link: String,
    wardrobe: {
        type: mongoose.Types.ObjectId,
        ref: "Wardrobe"
    }
})
const Bottom = mongoose.model("Bottom", bottomSchema)

module.exports = Bottom