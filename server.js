const express = require("express")
const cors = require('cors')
const app = express();
const cookieParser = require("cookie-parser");

const dbConfig = require('./db');
const roomRoute = require('./routes/roomRoute');
const userRoute = require('./routes/userRoute')
const bookingRoute = require('./routes/bookingRoute')

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())



app.use(cors())
app.use(cookieParser())

app.use(express.json())

app.use('/api/rooms', roomRoute)
app.use('/api/users', userRoute)
app.use('/api/bookings', bookingRoute)

const port = process.env.Port || 5000;

app.listen(port, () => console.log('Node Server Started use Nodemon'));
