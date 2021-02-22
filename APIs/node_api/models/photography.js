const mongoose = require('mongoose'); // import library

let newPhotographySchema = mongoose.Schema({
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
    location: {
        type: String,
        required: true
    },
    pictures: []
})
let photography = module.exports = mongoose.model("photography", newPhotographySchema)