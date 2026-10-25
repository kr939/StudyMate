const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      trim: true,
      default: ""
    },
    color: {
      type: String,
      default: "#6366f1"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);