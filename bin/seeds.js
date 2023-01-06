const mongoose = require('mongoose');
const FreeStuff = require('../models/FreeStuff.model');


const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/myproject';

const freeStuffs = [
    {
        title: "The British Museum",
        category: 'Museum',
        location: 'London',
        description:
        "Boring, but free!",
    },
    {
        title: "100 Montaditos",
        category: 'Bar',
        location: 'Madrid',
        description:
        "Disgusting, but cheap beer!",
    },

];

mongoose
  .connect('mongodb://127.0.0.1/myproject')
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`);
    return FreeStuff.deleteMany()
  })
  .then((response) => {
    console.log(response);

    return FreeStuff.create(freeStuffs)
  })
  .catch(err => console.error('Error... ', err))
  .then( freeStuffFromDB => {

    console.log("Number of freestuffs created: ", freeStuffFromDB.length);

    console.log(freeStuffFromDB)

    mongoose.connection.close();
  })
  .catch(err => console.error('Error... ', err));


