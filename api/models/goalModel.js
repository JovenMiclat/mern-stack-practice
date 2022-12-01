const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      // added because goal should be submitted by a user
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users", //model name
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goals", goalSchema, "Goals"); //first argument: name, second argument: schema in code, third argument: collection name
