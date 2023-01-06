const express = require("express");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//const City = require("../models/City.model");
const FreeStuff = require("../models/FreeStuff.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

/* GET free stuffs list page */
router.get("/free-stuffs", (req, res, next) => {

    FreeStuff.find()
        .then(freeStuffFromDB => {
            res.render("freeStuff/freeStuff-list", { freestuff: freeStuffFromDB })
        })
        .catch(err => {
            console.log("error getting free stuffs from DB", err);
            next(err);
        })
});

//GET access create new free stuff form
router.get("/free-stuffs/create", (req, res, next) => {
    FreeStuff.find()
        .then((freeStuffsArr) => {
            res.render("freeStuff/create-freeStuff", { freeStuffsArr });
        })
        .catch(err => {
            console.log("error getting free stuffs from DB", err);
            next(err);
        })
});


//CREATE: process form
router.post("/free-stuffs/create", (req, res, next) => {

    const freeStuffDetails = {
        title: req.body.title,
        category: req.body.category,
        location: req.body.location,
        description: req.body.description,
    }

    FreeStuff.create(freeStuffDetails)
        .then(freeStuffDetails => {
            res.redirect("/free-stuffs");
        })
        .catch(err => {
            console.log("error creating new free stuff in DB", err);
            next();
        })
});
  


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