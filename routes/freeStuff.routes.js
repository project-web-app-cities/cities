const express = require("express");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User.model")
const FreeStuff = require("../models/FreeStuff.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isCreator = require("../middleware/isCreator")

const router = express.Router();

/* GET free stuffs list page */
router.get("/free-stuffs", (req, res, next) => {

    FreeStuff.find()
        .populate("creator")
        .then(freeStuffFromDB => {
            res.render("freeStuff/freeStuff-list", { freestuff: freeStuffFromDB })
        })
        .catch(err => {
            console.log("error getting free stuffs from DB", err);
            next(err);
        })
});

//GET access create new free stuff form
router.get("/free-stuffs/create", isLoggedIn, (req, res, next) => {
    User.find()
        .then((usersArray) => {
            res.render("freeStuff/create-freeStuff", { usersArray });
        })
        .catch(err => {
            console.log("error getting free stuffs from DB", err);
            next(err);
        })
});


//CREATE: process form
router.post("/free-stuffs/create", isLoggedIn, (req, res, next) => {

    const freeStuffDetails = {
        description: req.body.description,
        category: req.body.category,
        country: req.body.country,
        city: req.body.city,
        creator: req.session.loggedUser._id
    }

    if (!freeStuffDetails.description || !freeStuffDetails.category || !freeStuffDetails.country || !freeStuffDetails.city) {
        res.render('freeStuff/create-freeStuff', {errorMessage: 'All fields required'});
        return;
    }

    FreeStuff.create(freeStuffDetails)
        .then(freeStuffDetails => {
            console.log(freeStuffDetails)
            res.redirect("/free-stuffs");
        })
        .catch(err => {
            console.log("error creating new free stuff in DB", err);
            next();
        })
});
  
router.get("/free-stuffs/:freestuffId", (req, res, next) => {
    const id = req.params.freestuffId;

    FreeStuff.findById(id)
        .populate("creator")
        .then(freeStuffDetails => {
            console.log(freeStuffDetails)
            res.render("freeStuff/freeStuff", freeStuffDetails);
        })
        .catch(err => {
            console.log("error getting details from DB", err);
            next(err);
        })
});

router.get("/free-stuffs/countries/:country", (req, res, next) => {
    const country = req.params.country;

    FreeStuff.find({country : country})
        .then(selectedCountry => {
            console.log(selectedCountry)
            res.render("freeStuff/country-list", selectedCountry);
        })
        .catch(err => {
            console.log("error getting details from DB", err);
            next(err);
        })
});

//Filter cities

router.get("/free-stuffs/cities/:city", (req, res, next) => {
    const city = req.params.city;

    FreeStuff.find({city : city})
        .then(selectedCity => {
            console.log(selectedCity)
            res.render("freeStuff/city-filter", {fileteredCity: selectedCity});
        })
        .catch(err => {
            console.log("error getting details from DB", err);
            next(err);
        })
});

router.get("/free-stuffs/:freestuffId/edit", isLoggedIn, isCreator, (req, res, next) => {

    let freeStuffDetails;
  
    FreeStuff.find()
        .then( (freeStuffFromDB) => {
            freeStuffDetails = freeStuffFromDB;
            
            return FreeStuff.findById(req.params.freestuffId)
        })
        .then((freeStuffDetails) => {
            const data = {
                freeStuffDetails: freeStuffDetails,
            }
  
            res.render("freestuff/freestuff-edit", data);
        })
        .catch(err => {
            console.log("Error getting freestuff details from DB...", err);
            next();
        });
  });
router.post('/free-stuffs/:freestuffId/edit', isLoggedIn, isCreator, (req, res, next) => {
    const freestuffId = req.params.freestuffId;
    const newDetails = {
        description: req.body.description,
        category: req.body.category,
        country: req.body.country,
        city: req.body.city, 
    }
  
    FreeStuff.findByIdAndUpdate(freestuffId, newDetails)
      .then(() => {
        res.redirect("/free-stuffs");
    })
      .catch(err => {
        console.log("Error updating freestuff...", err);
        next()
      });
});
  
    //DELETE free stuff
router.post("/free-stuffs/:freestuffId/delete", isLoggedIn, isCreator, (req, res, next) => {
    FreeStuff.findByIdAndDelete(req.params.freestuffId)
        .then(() => {
            res.redirect("/free-stuffs");
        })
        .catch(err => {
            console.log("Error deleting free stuff...", err);
            next();
        });

});


module.exports = router;