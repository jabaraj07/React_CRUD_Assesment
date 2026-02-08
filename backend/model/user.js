const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true
    },

    lastName: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true
    },

    phoneNumber: {
      type: String,
      unique: true,
      sparse: true 
    }
  },
  {
    strict: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
