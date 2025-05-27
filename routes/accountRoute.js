// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

// My Account route
router.get(
    '/', 
    utilities.handleErrors(accountController.buildLogin)
)

module.exports = router