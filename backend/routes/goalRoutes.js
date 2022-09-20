const express = require("express");
const router = express.Router();
const {
  createGoal, //create
  readGoals, //read
  updateGoal, //update
  deleteGoal, //delete
} = require("../controllers/goalController"); //get exports from goalController.js

const { protect } = require("../middleware/authMiddleware");

// Sample Requests
router.route("/").post(protect, createGoal).get(protect, readGoals); //Create and Read (Clean code)
// router.post("/", createGoal); //create
// router.get("/", readGoals); //read

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal); //Update and Delete (Clean code)
// router.put("/:id", updateGoal); //update
// router.delete("/:id", deleteGoal); //delete

module.exports = router;
