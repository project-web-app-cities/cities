const mongoose = require('mongoose');
const FreeStuff = require('../models/FreeStuff.model');


const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/library-project';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`);
    return FreeStuff.deleteMany()
  })
  .then((response) => {
    console.log(response);
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
    
    ]
    return FreeStuff.insertMany(freeStuffs)
  })
  .then( freeStuffFromDB => {

    console.log("Number of freestuffs created: ", freeStuffFromDB.length);

    console.log(freeStuffFromDB)

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.error('Error... ', err));


