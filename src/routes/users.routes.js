const { Router } = require("express");
const router = Router();

const {
  signIn,
  logout,
  renderSignInForm,
} = require("../controllers/users.controller");

router.get("/users/signin", renderSignInForm);
router.post("/users/signin", signIn);

router.get("user/logout", logout);

module.exports = router;
