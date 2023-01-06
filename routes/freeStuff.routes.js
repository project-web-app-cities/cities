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
  


router.get("/free-stuffs/:freestuffId/edit", (req, res, next) => {

    let freestuffArr;
  
    FreeStuff.find()
        .then( (freeStuffFromDB) => {
            freestuffArr = freeStuffFromDB;
            
            return FreeStuff.findById(req.params.freestuffId)
        })
        .then((bookDetails) => {
            const data = {
                freestuffArr: freestuffArr,
            }
  
            res.render("freestuff/freestuff-edit", data);
        })
        .catch(err => {
            console.log("Error getting freestuff details from DB...", err);
            next();
        });
  });


module.exports = router;