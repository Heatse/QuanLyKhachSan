const mongoose = require("mongoose");

var mongoURl = 'mongodb+srv://Heatse:Transon2002@cluster0.i0avq2o.mongodb.net/hotel_manage'

mongoose.connect(mongoURl, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongo DB Connection failed')
});

connection.on('connected', () => {
    console.log('Mongo DB Connection Succesfull')
});

module.exports = mongoose