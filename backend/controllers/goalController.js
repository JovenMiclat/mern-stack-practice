const asyncHandler = require("express-async-handler"); //To not use the try-catch, we can use this library

const Goals = require("../models/goalModel"); // imports goalModel.js which represents the Collection from mongoDB

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
  });

  res.status(200).json(goal); // response for successfully executing and displaying what was created.
});

// @desc Read goals
// @route GET /api/goals
// @access Private
const readGoals = asyncHandler(async (req, res) => {
  const goals = await Goals.find(); // function that reads from goals collection
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

  await goal.remove(); // function that deletes the goal that was found with its id.

  res.status(200).json({ id: req.params.id }); // response for successfully reading/getting the goal and displaying what it deleted.
});

module.exports = {
  createGoal,
  readGoals,
  updateGoal,
  deleteGoal,
}; // exports the functions created
