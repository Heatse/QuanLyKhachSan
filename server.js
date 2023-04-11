const express = require("express")
const cors = require('cors')
const app = express();

const dbConfig = require('./db');
const roomRoute = require('./routes/roomRoute');
const cookieParser = require("cookie-parser");

app.use(cors())
app.use(cookieParser())

app.use(express.json())

app.use('/api/rooms', roomRoute)

const port = process.env.Port || 5000;

app.listen(port, () => console.log('Node Server Started use Nodemon'));
