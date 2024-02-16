const {
    AuthController,
    login,
    AuthPageController,
} = require("../controllers/authController");
const { restrict, ensureNotLoggedIn } = require("../helpers/middleware");

const router = require("express").Router();

// Restrict disini adalah proses authentication atau pengecekan apakah user sudah login atau belum
router.get("/", restrict, AuthPageController.greet);

router.get("/login", ensureNotLoggedIn, AuthPageController.loginPage);
router.post("/login", AuthController.login);
router.get("/register", ensureNotLoggedIn, AuthPageController.registerPage);
router.post("/register", AuthController.register);

router.post("/logout", AuthController.logout);

module.exports = { router };
