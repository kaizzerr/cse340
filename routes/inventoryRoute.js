// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route for viewing vehicles by inventory id
router.get("/detail/:invId", invController.buildDetailView)

module.exports = router;