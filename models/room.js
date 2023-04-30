const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({

    name: {
        type: String,
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

    rentperday: {
        type: Number,
        required: true
    },

    imageurls: {
        type: [String],
        default: []
    },

    currentbookings: {
        type: [String],
        default: []
    },

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