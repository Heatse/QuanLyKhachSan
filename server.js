const express = require("express")

const app = express();

const dbConfig = require('./db');
const roomRoute = require('./routes/roomRoute')

app.use('/api/rooms', roomRoute)

const port = process.env.Port || 5000;

app.listen(port, () => console.log('Node Server Started use Nodemon'));
