const mongoose = require('mongoose'); // import library

let newVideoSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    eteteVideo: []
})
let video = module.exports = mongoose.model("video", newVideoSchema)