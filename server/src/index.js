const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();

const app = express();

//middlewares:

app.use(express.json()); //convert data from FE to json inside every single request
app.use(cors());

//Routers

const userRouter = require("./routes/users");
app.use("/auth", userRouter);

const recipesRouter = require("./routes/recipes");
app.use("/recipes", recipesRouter);

//connect to db

mongoose.connect(`mongodb+srv://206i417:${process.env.DATABASE_PASSWORD}@recipes.uuxmdi7.mongodb.net/recipes?retryWrites=true&w=majority`)


app.listen(3001, () => {
    console.log("SERVER STARTED ON PORT 3001")
})
