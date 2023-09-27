const express = require("express");
const mongoose = require("mongoose");
const RecipeModel = require("../models/Recipes");
const UserModel = require("../models/Users");


const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response)

    } catch (err) {
        res.json(err)
    };
});

router.post("/", async(req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save();
        res.json(response)

    } catch (err) {
        res.json(err)
    };
});

//we need to save the recipeId in the users data:
router.put("/", async(req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipeId);  //loking for the particular recipe by it'd id from a req.body
    const user = await UserModel.findById(req.body.userId); //loking for the particular user by it'd id from a req.body
        
    try {
        user.savedRecipes.push(recipe); //push in the user table inside a savedRecipes raw the id of the foud recipe
        await user.save(); //save it
        res.status(201).json({ savedRecipes: user.savedRecipes }); //put savedRecipes data under the key savedRecipes in a json file
           
    } catch (err) {
        res.status(500).json(err)
    };
});

router.get("/savedRecipes/ids/:userId", async(req, res) => {
    
    try {
        const user = await UserModel.findById(req.params.userId);
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err)
    };
});

router.get("/savedRecipes/:userId", async(req, res) => {
    
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        })
        res.json({ savedRecipes })
    } catch (err) {
        res.json(err)
    };
});

module.exports = router;