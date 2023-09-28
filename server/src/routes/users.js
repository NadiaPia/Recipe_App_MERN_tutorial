const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

const router = express.Router();


router.post("/register", async(req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username: username});
    
    if(user) {
        return res.json({message: "User already exists!"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save();

    res.json({message: "User registrated successfully"});
})

router.post("/login", async(req, res) => {
    const {username, password} = req.body;   
    const user = await UserModel.findOne({username: username});
    if(!user) {
        return res.json({message: "User doesn't exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.json({message: "Username or Password is Incorrect"});
    }

    const token = jwt.sign({ id: user._id}, "secret");
    res.json({ token, userId: user._id });

});
//export { router as userRouter}

module.exports = router;