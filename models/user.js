const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true
})

const userModels = mongoose.model('users', userSchema)

module.exports = userModels