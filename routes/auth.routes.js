const bcrypt = require("bcrypt");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

const router = require("express").Router();

const saltRounds = 10;

//SIGNUP: display form
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//SIGNUP: process form
router.post("/signup", (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.render("auth/signup", {
      errorMessage:
        "Sorry, you need a name, an email and an user name to register.",
    });
    return;
  }

  User.findOne({ email: email }).then((userFromDB) => {
    if (userFromDB) {
      res.render("auth/signup", {
        errorMessage: "This mail is already registered. Try another one.",
      });
      return;
    } else {
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!regex.test(password)) {
          res
            .status(400)
            .render("auth/signup", {
              errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
          });
          return;
        }
      bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          return bcrypt.hash(password, salt);
        })
        .then((hash) => {
          const userDetails = {
            name,
            email,
            passwordHash: hash,
          };

          return User.create(userDetails);
        })
        .then((userFromDB) => {
          res.redirect("/");
        })
        .catch((e) => {
          console.log("error creating user account", e);
          next(e);
        });
    }
  });
});

//LOGIN: display form
router.get("/login", (req, res) => res.render("auth/login"));

//LOGIN: process form
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email : email })
    .then((userFromDB) => {
      if (!userFromDB) {
        res.render("auth/login", {
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (bcrypt.compareSync(password, userFromDB.passwordHash)) {
        req.session.loggedUser = userFromDB;
        res.render("users/user-profile", {
          userInSession: req.session.loggedUser,
        });
      } else {
        res.render("auth/login", { errorMessage: "Incorrect credentials." });
      }
    })
    .catch((error) => {
      console.log("Error trying to login", error);
      next(error);
    });
});

//User Profile
router.get("/user-profile", isLoggedIn, (req, res) => {
  res.render("users/user-profile", { userInSession: req.session.loggedUser });
});

//LOGOUT
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);

    res.redirect("/");
  });
});

module.exports = router;
