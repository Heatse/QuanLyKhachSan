const express = require("express")
const router = express.Router();
const User = require('../models/user')


router.post("/register/", async (req, res) => {
    const newuser = new User({ name: req.body.name, email: req.body.email, password: req.body.password });

    try {
        const user = await newuser.save();
        res.send('Tạo tài khoản thành công');
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.post("/login/", async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email, password: password })
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            res.send(temp)
        }
        else {
            return res.status(400).json({ message: "Sai thông tin đăng nhập" });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error });
    }

});

router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        if (!deletedUser) {
            return res.status(404).send();
        }
        res.send(deletedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;