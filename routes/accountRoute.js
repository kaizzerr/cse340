// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

// Login route
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Registration route (GET)
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Registration route (POST)
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router