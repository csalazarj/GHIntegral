const userCtrl = {};

userCtrl.renderSignInForm = (req, res) => {
  res.render("users/signin");
};

userCtrl.signIn = (req, res) => {
  res.send("Sign In");
};

userCtrl.logout = (req,res)=>{
    res.send('Log Out')
};

module.exports = userCtrl;