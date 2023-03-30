const mongoose = require("mongoose");

var mongoURl = 'mongodb+srv://heatse:myq88jHRAKyrxG51@cluster0.zecnyx8.mongodb.net/hotel_manager'

mongoose.connect(mongoURl, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongo DB Connection failed')
});

connection.on('connected', () => {
    console.log('Mongo DB Connection Succesfull')
});

module.exports = mongoose