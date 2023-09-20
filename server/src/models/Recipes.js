const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: [{type: String, required: true}], //[] array bracets means there are a lot of ingredients
    instructions: {type: String, required: true},
    imageUrl: {type: String, required: true},
    cookingTime: {type: Number, required: true},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true} //ObjectId is because from the db the id of the user signed as:" _id: ObjectId(65090e4c707f9dece81f09b8) "

});

const RecipeModel = mongoose.model("recipes", RecipeSchema);
module.exports = RecipeModel;