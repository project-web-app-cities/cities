const { Schema, model, default: mongoose } = require("mongoose");

const freeStuffSchema = new Schema({
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  category: {
    type: String,
    enum: [
      "Museum",
      "Restaurant",
      "Bar",
      "Club",
      "Sport",
      "Events",
      "Transportation",
      "Other",
    ],
    required: [true, "Please select a category"],
  },
  city: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  creator:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'} ,
  image: String,
});

module.exports = model("FreeStuff", freeStuffSchema);
