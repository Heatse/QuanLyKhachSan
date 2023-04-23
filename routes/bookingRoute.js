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
            status: 'Đã đặt'
        })
        const booking = await newBooking.save()

        // const roomtemp = await Room.findOne({ _id: room._id });

        // roomtemp.currentbookings.push({
        //     bookingid: booking._id,
        //     fromdate: fromdate,
        //     todate: todate,
        //     userid: userid,
        //     status: booking.status,
        // });

        // await roomtemp.save();

        await Room.updateOne(
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
            }
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
        const booking = await Booking.findById(bookingid);
        if (!booking) {
            return res.status(404).json({ message: "Không tìm thấy thông tin đặt phòng" });
        }
        booking.status = "Đã Hủy";
        await booking.save();

        const room = await Room.findById(roomid);
        if (!room) {
            return res.status(404).json({ message: "Không tìm thấy thông tin phòng" });
        }
        room.currentbookings = room.currentbookings.filter(
            (booking) => booking.bookingid.toString() !== bookingid
        );
        await room.save();

        res.send("Bạn đã hủy phòng thành công");

    } catch (error) {
        return res.status(400).json({ error });
    }
})

module.exports = router