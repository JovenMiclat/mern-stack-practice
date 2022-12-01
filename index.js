// imports
const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config(); //Loads .env from home dir
const { errorHandler } = require("./api/middleware/errorMiddleware"); //Loads error handler

const connectDB = require("./api/config/db"); // Loads db.js that connects to MongoDB
const port = process.env.PORT || 5000; // Loads PORT from .env

connectDB(); // uses connectDB function from connectDB import.

const app = express(); // Assigning variable to express library

const cors = require("cors");
app.use(cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Body parsers

app.use("/api/goals", require("./api/routes/goalRoutes")); //using API and requiring a file that imports a controller
app.use("/api/users", require("./api/routes/userRoutes")); //using API and requiring a file that imports a controller

app.get("/api/test", (req, res) => {
  res.send("test");
});

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/out")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "./frontend/out/index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production."));
}

app.use(errorHandler); //Uses errorMiddleware.js

app.listen(port, () => console.log(`Server started on port ${port}`));
