const mongoose = require("mongoose");

const UserScema = new mongoose.Schema({
    username: {type: String, required: true, uniqie: true},
    password: {type: String, required: true}
});

//export const UserModel = mongoose.model("users", UserScema);


const UserModel = mongoose.model("users", UserScema);
module.exports = UserModel;
