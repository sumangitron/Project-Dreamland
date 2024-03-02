const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route to create a new form
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Creat Route (C => Create)
router.post("/", isLoggedIn, upload.single("listing[image]"), wrapAsync(listingController.createListing));

//Show Route (R => Read)
router.get("/:id", wrapAsync(listingController.showListingDetails));

//Edit Route to edit post
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderFormForEdit));

//Update Route (U => Update)
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));

//Delete Route (D => Delete)
router.delete("/:id", isLoggedIn, isOwner ,wrapAsync(listingController.destroyListing));

module.exports = router;
