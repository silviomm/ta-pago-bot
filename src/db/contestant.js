const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contestant = new Schema(
  {
    username: {
        type: String
    },
    weeklyCount: {
        type: Number
    },
    totalCount: {
        type: Number
    },
    startWeek: {
        type: Date
    },
    endWeek: {
        type: Date
    }
  },
  { collection: "Contestants" }
);

module.exports = mongoose.model("contestants", contestant);