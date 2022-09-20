const asyncHandler = require("express-async-handler"); //To not use the try-catch, we can use this library

const Goals = require("../models/goalModel"); // imports goalModel.js which represents the Goals Collection from mongoDB
const Users = require("../models/userModel"); // imports userModel.js which represents the Users Collection from mongoDB
//Also imported since Users is now part of goalModel.js

// @desc Create goals
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    //body.key
    res.status(400);
    throw new Error("Please add a text field");
  }
  // console.log(req.body);

  const goal = await Goals.create({
    // function that saves to goals collection
    text: req.body.text,
    user: req.user.id, // Goals binded with user ID
  });

  res.status(200).json(goal); // response for successfully executing and displaying what was created.
});

// @desc Read goals
// @route GET /api/goals
// @access Private
const readGoals = asyncHandler(async (req, res) => {
  const goals = await Goals.find({ user: req.user.id }); // function that reads from goals collection. UPD: gets goals from user logged in through token
  res.status(200).json({ goals }); // response for successfully reading/getting goals and displaying it all.
});

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id); // function that reads from a goal with its id from goals collection
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  //Checks if there's a logged in user and uses it's ID to scan the provided goal ID
  const user = await Users.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    // function that updates it
    new: true,
  });

  res.status(200).json(updatedGoal); // response for successfully reading/getting the goal and displaying what it updated.
});

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id); // function that reads from a goal with its id from goals collection
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  //Checks if there's a logged in user and uses it's ID to scan the provided goal ID
  const user = await Users.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove(); // function that deletes the goal that was found with its id.

  res.status(200).json({ id: req.params.id }); // response for successfully reading/getting the goal and displaying what it deleted.
});

module.exports = {
  createGoal,
  readGoals,
  updateGoal,
  deleteGoal,
}; // exports the functions created
