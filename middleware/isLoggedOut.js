module.exports = (req, res, next) => {
  if (req.session.loggedUser) {
    return res.redirect("/");
  }
  next();
};
