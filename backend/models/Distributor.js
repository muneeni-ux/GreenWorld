const mongoose = require("mongoose");

const distributorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    dob: {
      type: String
    },
    dor:{
      type: String
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    idNumber : {
      type: String,
    },
    nationality: {
      type: String,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Distributor", distributorSchema);