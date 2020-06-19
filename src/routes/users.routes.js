const { Router } = require("express");
const multer = require("multer");

// Multer´s Services Index
const storageService = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/services_img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadService = multer({ storage: storageService });

// Multer´s Employees About us
const storageEmployee = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/employees/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadEmployee = multer({ storage: storageEmployee });

// Multer´s About us Content
const storageAbout = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadAbout = multer({ storage: storageAbout });

const router = Router();

const {
  signIn,
  logout,
  renderSignInForm,
  renderSignUpForm,
  signUp,
  renderServiceForm,
  createNewService,
  renderEditServiceForm,
  updateService,
  deleteService,
  renderEmployeeForm,
  createNewEmployee,
  renderEditEmployeeForm,
  updateEmployee,
  deleteEmployee,
  renderAboutForm,
  editAbout
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

// Add service to Index
router.get("/users/add-service", isAutenticated, renderServiceForm);
router.post(
  "/users/add-service",
  isAutenticated,
  uploadService.single("img_file_service"),
  createNewService
);

// Update services
router.get("/users/edit-service/:id", isAutenticated, renderEditServiceForm);
router.put(
  "/users/edit-service/:id",
  uploadService.single("img_file_service"),
  isAutenticated,
  updateService
);

// delete service
router.delete("/users/delete-service/:id", isAutenticated, deleteService);

// -------------------------- ABOUT US / EMPLOYEES SECTION -----------------------------

router.get("/users/edit-about-us", isAutenticated, renderAboutForm);
router.put(
  "/users/edit-about-us",
  isAutenticated,
  uploadAbout.single("img_file_about_us"),
  editAbout
);

// Add employee to about us
router.get("/users/add-employee", isAutenticated, renderEmployeeForm);
router.post(
  "/users/add-employee",
  isAutenticated,
  uploadEmployee.single("img_file_employee"),
  createNewEmployee
);

// Update employee to about us
router.get("/users/edit-employee/:id", isAutenticated, renderEditEmployeeForm);
router.put(
  "/users/edit-employee/:id",
  uploadEmployee.single("img_file_employee"),
  isAutenticated,
  updateEmployee
);

// delete employee
router.delete("/users/delete-employee/:id", isAutenticated, deleteEmployee);

module.exports = router;
