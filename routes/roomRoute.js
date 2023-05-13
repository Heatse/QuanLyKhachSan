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

router.post('/addroom', async (req, res) => {
    try {
        const newroom = new Room(req.body)
        await newroom.save()
        res.send('Thêm phòng thành công')
    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.delete('/deleteroom/:id', async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndRemove(req.params.id);
        if (!deletedRoom) {
            return res.status(404).send();
        }
        res.send(deletedRoom);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/updateroom/:id', async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRoom) {
            return res.status(404).send();
        }
        res.send(updatedRoom);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;