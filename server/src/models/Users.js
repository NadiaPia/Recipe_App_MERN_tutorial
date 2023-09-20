const mongoose = require("mongoose");

const UserScema = new mongoose.Schema({
    username: {type: String, required: true, uniqie: true},
    password: {type: String, required: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}],
});

//export const UserModel = mongoose.model("users", UserScema);


const UserModel = mongoose.model("users", UserScema);
module.exports = UserModel;
