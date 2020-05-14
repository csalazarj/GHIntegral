const { Router } = require("express");
const router = Router();

const {
  signIn,
  logout,
  renderSignInForm,
  renderSignUpForm,
  signUp,
} = require("../controllers/users.controller");

// Register user
router.get("/users/signup", renderSignUpForm);
router.post("/users/signup", signUp);

// Login user
router.get("/users/signin", renderSignInForm);
router.post("/users/signin", signIn);

// Logout
router.get("user/logout", logout);

module.exports = router;
