const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    favorites: [{ 
      type: Schema.Types.ObjectId,
      ref: "FreeStuff"}]        
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);
