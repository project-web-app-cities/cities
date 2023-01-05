const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true 
    },
    passwordHash: { 
      type: String,
      required: [true, 'Password is required']
    },
    username: {
        type: String,
        required: true
    },
    country: String,
    language: Array,
    picture: String,
    savedCities: Array
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
