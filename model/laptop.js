const mongoose = require('mongoose')
const laptopSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    }})

module.exports = mongoose.model("Laptop", laptopSchema)