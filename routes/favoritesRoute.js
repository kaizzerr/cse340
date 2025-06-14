const express = require("express")
const router = express.Router()
const favoriteController = require("../controllers/favoriteController")

// POST: Add favorite (POST)
router.post("/add", favoriteController.buildAddFavorite)

// View all favorites (GET)
router.get("/", favoriteController.buildViewFavorites)

module.exports = router