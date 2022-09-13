// imports
const express = require("express");
const dotenv = require("dotenv").config(); //Loads .env from home dir
const { errorHandler } = require("./middleware/errorMiddleware"); //Loads error handler

const connectDB = require("./config/db");
const port = process.env.PORT || 5000; // Loads PORT from .env

connectDB();

const app = express(); // Assigning variable to express library

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Body parsers

app.use("/api/goals", require("./routes/goalRoutes")); //using API and requiring a file that imports a controller

app.use(errorHandler); //Uses errorMiddleware.js

app.listen(port, () => console.log(`Server started on port ${port}`));
