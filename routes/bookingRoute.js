const express = require("express")
const router = express.Router();
const Booking = require('../models/booking')
const Room = require('../models/room')

router.post("/bookroom", async (rep, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays } = rep.body;

    try {
        const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId: '1234',
        })
        const booking = await newBooking.save()

        await Room.findOneAndUpdate(
            { _id: room._id },
            {
                $push: {
                    currentbookings: {
                        bookingid: booking._id,
                        fromdate: fromdate,
                        todate: todate,
                        userid: userid,
                        status: booking.status
                    }
                }
            },
            { new: true }
        );

        res.send("Đặt phòng thành công");
    } catch (error) {
        return res.status(400).json({ error });
    }

});


router.post("/getbookinguser", async (rep, res) => {
    const userid = rep.body.userid

    try {
        const bookings = await Booking.find({ userid: userid })
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.post("/cancelbooking", async (rep, res) => {
    const { bookingid, roomid } = rep.body

    try {
        const booking = await Booking.findOneAndUpdate(
            { _id: bookingid },
            { status: "Đã Hủy" },
            { new: true }
        );
        await Room.findOneAndUpdate(
            { _id: roomid },
            { $pull: { currentbookings: { bookingid: booking._id } } },
            { new: true }
        );
        res.send("Hủy Phòng Thành Công");

    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.get("/getallbookings", async (rep, res) => {

    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }
})

module.exports = router