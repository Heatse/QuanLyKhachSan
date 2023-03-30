const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name: {
        type: Sting,
        required: true
    },

    maxCount: {
        type: Number,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },
    imageurls: [],
    currentbookings: [],

    type: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const roomModels = mongoose.model('rooms', roomSchema)

module.exports = roomModels