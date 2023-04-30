const express = require("express")

const router = express.Router();

const Room = require('../models/room')

router.get("/rooms", async (req, res) => {

    try {
        const rooms = await Room.find({})
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid

    try {
        const room = await Room.findOne({ _id: roomid })
        res.send(room);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post("/addroom", async (req, res) => {

    const newroom = new Room({
        name: req.body.name,
        maxCount: req.body.maxCount,
        phoneNumber: req.body.phoneNumber,
        rentperday: req.body.rentperday,
        imageurls: req.body.imageurls,
        type: req.body.type,
        description: req.body.description
    });

    try {
        const saveroom = await newroom.save();
        res.send('Thêm phòng thành công')
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

module.exports = router;