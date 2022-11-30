import express from 'express'
import * as dotenv from 'dotenv'
import recipeRouter from './routes/recipe.routes.js'
import dbConnection from './config/db.config.js'

dotenv.config()

dbConnection()

const app = express()

app.use(express.json())

app.use('/recipe', recipeRouter)

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

await Model.create({
  title: "hummus",
  level: "Easy Peasy",
  ingredients: ["chickpeas", "lemon", "tahini", "salt", "garlic"],
  cuisine: "arab",
  dishType: "snack",
  image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3648220.jpg&q=60&c=sc&orient=true&poi=auto&h=512",
  duration: 5,
  creator: "Paula",
  created: 30/11/2022
})

app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'))