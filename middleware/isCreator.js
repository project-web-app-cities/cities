const FreeStuff = require("../models/FreeStuff.model");

module.exports = (req, res, next) => {
  const currenUserId= req.session.loggedUser._id;
  
  FreeStuff.findById(req.params.freestuffId)

  .then((freeStuffObj) => {
    console.log(freeStuffObj)
    if (currenUserId.toString() !== freeStuffObj.creator.toString()) {
      return res.redirect("/free-stuffs");
    }
    next()
  })
  .catch(error => {
    console.log("You cannot change this free stuff", error)
    next(error);
});
  
};
