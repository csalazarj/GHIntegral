const helpers = {};

helpers.isAutenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No estás Autorizado");
  res.redirect("/users/signin");
};

module.exports = helpers;
