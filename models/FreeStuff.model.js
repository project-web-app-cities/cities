const { Schema, model } = require("mongoose");

const freeStuffSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Museum', 'Restaurant', 'Bar', 'Club', 'Sport', 'Events', 'Transportation', 'Other'],
    required: [true, "Please select a category"]
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
  },
  image: String,
});


module.exports = model('FreeStuff', freeStuffSchema);