const asyncHandler = require("express-async-handler");

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
  res.status(200).json({ message: "Create Goal" });
});

// @desc Read goals
// @route GET /api/goals
// @access Private
const readGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Read Goals" });
});

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = {
  createGoal,
  readGoals,
  updateGoal,
  deleteGoal,
}; // exports the functions created
