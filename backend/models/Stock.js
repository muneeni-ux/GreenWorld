const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    bv: {
      type: Number,
      default: 0, // Bonus Value
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Optional: link to user who added it
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);
