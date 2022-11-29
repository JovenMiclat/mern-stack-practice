const asyncHandler = require("express-async-handler"); //To not use the try-catch, we can use this library

const Goals = require("../models/goalModel"); // imports goalModel.js which represents the Goals Collection from mongoDB
//Also imported since Users is now part of goalModel.js

// @desc Create goals
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  const { title, description } = req.body; //from api request (postman)
  if (!title) {
    //body.key
    res.status(400);
    throw new Error("Please add a title");
  }
  if (!description) {
    //body.key
    res.status(400);
    throw new Error("Please add a description");
  }
  // console.log(req.body);

  const goal = await Goals.create({
    // function that saves to goals collection
    title,
    description,
    user: req.user.id, // Goals binded with user ID
  });

  res.status(200).json(goal); // response for successfully executing and displaying what was created.
});

// @desc Read goals
// @route GET /api/goals
// @access Private
const readGoals = asyncHandler(async (req, res) => {
  const goals = await Goals.find({ user: req.user.id }); // function that reads from goals collection. UPD: gets goals from user logged in through token
  res.status(200).json(goals); // response for successfully reading/getting goals and displaying it all.
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

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
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

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
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
