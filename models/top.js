const mongoose = require('mongoose')


//created a model 
const topSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: String,
    description: String,
    link: String,
    wardrobe: {
        type: mongoose.Types.ObjectId,
        ref: "Wardrobe"
    }
})
const Top = mongoose.model("Top", topSchema)

module.exports = Top


//one to many relationship - look it up 