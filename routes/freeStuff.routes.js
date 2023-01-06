const express = require("express");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//const City = require("../models/City.model");
const FreeStuff = require("../models/FreeStuff.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

/* GET city page */
router.get("/free-stuffs", (req, res, next) => {

    FreeStuff.find()
        .then(freeStuffFromDB => {
            res.render("freeStuff/freeStuff", { freestuff: freeStuffFromDB })
        })
        .catch(err => {
            console.log("error getting free stuffs from DB", err);
            next(err);
        })
});

//GET access create new city form
router.get("/freeStuff/create", (req, res, next) =>{
    res.render('create-freeStuff');
})

//POST create new city
router.post("/cities")
  


module.exports = router;