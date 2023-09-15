const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();


const app = express();
//console.log("process.env.DATABASE_PASSWORD", process.env.DATABASE_PASSWORD)

//middlewares:

app.use(express.json()); //convert data from FE to json inside every single request
app.use(cors());

//connect to db

mongoose.connect(`mongodb+srv://206i417:${process.env.DATABASE_PASSWORD}@recipes.uuxmdi7.mongodb.net/recipes?retryWrites=true&w=majority`)


app.listen(3001, () => {
    console.log("SERVER STARTED ON PORT 3001")
})
