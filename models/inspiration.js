const mongoose = require('mongoose')


//created a model 
const inspirationSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    link: String,
    wardrobe: {
        type: mongoose.Types.ObjectId,
        ref: "Wardrobe"
    }
})
const Inspiration = mongoose.model("Inspiration", inspirationSchema)

module.exports = Inspiration