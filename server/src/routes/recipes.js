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
    const recipe = await RecipeModel.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userId);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
    try {
        const response = await recipe.save();
        res.json(response)

    } catch (err) {
        res.json(err)
    };
});

router.get("/savedRecipes/ids", async(req, res) => {
    
    try {
        const user = await UserModel.findById(req.body.userId);
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err)
    };
});

router.get("/savedRecipes", async(req, res) => {
    
    try {
        const user = await UserModel.findById(req.body.userId);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        })
        res.json({ savedRecipes })
    } catch (err) {
        res.json(err)
    };
});

module.exports = router;