const mongoose = require("mongoose");
const HolidaySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    dayType: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Holiday = mongoose.model("Holiday", HolidaySchema);
module.exports = Holiday;
