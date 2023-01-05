const { Schema, model } = require("mongoose");

const freeStuffsSchema = new Schema({
  category: {
    enum: ['Museum', 'Restaurant', 'Bar', 'Club', 'Sport', 'Events', 'Transportation', 'Other'],
    required: [true, "Please select a category"]
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
});


module.exports = model('FreeStuff', freeStuffsSchema);