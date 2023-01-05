const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const City = require("../models/City.model");
// const FreeStuff = require("../models/FreeStuffs.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET city page */
router.get("/cities", (req, res, next) => {
    City.find()
        .then(citiesFromDB => {
            res.render("cities/available-cities", { cities: citiesFromDB })
        })
        .catch(err => {
            console.log("error getting cities from DB", err);
            next(err);
        })
});

//GET access create new city form
router.get("/cities/create", (req, res, next) =>{
    res.render('create-city');
})

//POST create new city
router.post("/cities")
  


module.exports = router;