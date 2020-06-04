const { Router } = require("express");
const router = Router();

const {
  renderIndex,
  renderAbout,
  renderService,
  renderError
  // renderS1,
  // renderS2,
  // renderS3,
  // renderS4,
  // renderS5,
  // renderS6,
  // renderS7,
  // renderS8,
  // renderContact,
} = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/about-us", renderAbout);
router.get("/service/:id", renderService);
// router.get("/*", renderError)
// router.get("/contact-us", renderContact);

// Services routes
// router.get("/asistencia-contable", renderS1);
// router.get("/asistencia-juridica", renderS2);
// router.get("/auditorias-sg-sst", renderS3);
// router.get("/gestion-humana", renderS4);
// router.get("/riesgo-psicosocial", renderS5);
// router.get("/seguridad-vial", renderS6);
// router.get("/seguridad-y-salud", renderS7);
// router.get("/seleccion-personal", renderS8);

module.exports = router;
