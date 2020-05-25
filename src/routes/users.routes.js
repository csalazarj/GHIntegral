const { Router } = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/services_img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const router = Router();

const {
  signIn,
  logout,
  renderSignInForm,
  renderSignUpForm,
  signUp,
  renderServiceForm,
  renderIndexAdmin,
  createNewService,
  renderEditServiceForm,
  updateService,
  deleteService,
} = require("../controllers/users.controller");

const { isAutenticated } = require("../helpers/auth");

// Register user
router.get("/users/signup", isAutenticated, renderSignUpForm);
router.post("/users/signup", isAutenticated, signUp);

// Login user
router.get("/users/signin", renderSignInForm);
router.post("/users/signin", signIn);

// Logout
router.get("/users/logout", isAutenticated, logout);

// -------------------------- SERVICES SECTION -----------------------------

router.get("/users/index-admin", isAutenticated, renderIndexAdmin);

// Add service to Index
router.get("/users/add-service", isAutenticated, renderServiceForm);
router.post(
  "/users/add-service",
  isAutenticated,
  upload.single("img_file_service"),
  createNewService
);

// Update services
router.get("/users/edit-service/:id", isAutenticated, renderEditServiceForm);
router.put(
  "/users/edit-service/:id",
  upload.single("img_file_service"),
  isAutenticated,
  updateService
);

// delete service
router.delete("/users/delete-service/:id", isAutenticated, deleteService);

module.exports = router;
