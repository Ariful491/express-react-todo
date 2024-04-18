const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

    title: {
        type: String, require: true,
    },

    details: {
        type: String, require: true,
    },


})

module.exports = mongoose.model('Card', cardSchema)