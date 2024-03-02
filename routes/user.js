const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

//router for Signup form
router.get("/signup", userController.renderSignupForm);

//router for Signup
router.post("/signup", wrapAsync(userController.signup));

//Router for Login form
router.get("/login", userController.renderLoginForm);

//Router for Login
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

//Router for Logout
router.get("/logout", userController.logout);

module.exports = router;
