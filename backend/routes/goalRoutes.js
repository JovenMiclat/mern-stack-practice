const express = require("express");
const router = express.Router();
const {
  createGoal, //create
  readGoals, //read
  updateGoal, //update
  deleteGoal, //delete
} = require("../controllers/goalController"); //get exports from goalController.js

// Sample Requests
router.route("/").post(createGoal).get(readGoals); //Create and Read (Clean code)
// router.post("/", createGoal); //create
// router.get("/", readGoals); //read

router.route("/:id").put(updateGoal).delete(deleteGoal); //Update and Delete (Clean code)
// router.put("/:id", updateGoal); //update
// router.delete("/:id", deleteGoal); //delete

module.exports = router;
