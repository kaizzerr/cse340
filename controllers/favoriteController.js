const favoriteModel = require("../models/favorite-model")
const utilities = require("../utilities")

/* ***************************
 *  View favorites by favorites view
 * ************************** */
async function buildAddFavorite(req, res) {
  try {
    const account_id = req.user?.account_id  
    const inv_id = req.body.invId

    if (!account_id) {
      req.flash("notice", "You must be logged in to favorite a vehicle.")
      return res.redirect("/account/login")
    }

    await favoriteModel.addFavorite(account_id, inv_id)
    req.flash("notice", "Vehicle added to favorites!")
    res.redirect(`/inv/detail/${inv_id}`)
  } catch (error) {
    next(error)
  }
}
  
/* ***************************
 *  Add favorited vehicles in favorites
 * ************************** */
async function addFavorite(req, res, next) {
  let nav = await utilities.getNav(req)
  res.render("account/add-favorite", {
    title: "Add Favorite",
    nav,
    errors: null,
  })
}
  

/* ***************************
 *  Build view Favorites
 * ************************** */
async function buildViewFavorites(req, res, next) {
  try {
    const account_id = req.session.account_id
    if (!account_id) {
      req.flash("notice", "You must be logged in to view favorites.")
      return res.redirect("/account/login")
    }

    const favorites = await favoriteModel.getFavoritesByUser(account_id)

    res.locals.favorites = favorites

    return viewFavorites(req, res)
  } catch (error) {
    next(error)
  }
}


/* ***************************
 *  View Favorites
 * ************************** */
async function viewFavorites(req, res) {
  const nav = await utilities.getNav(req)
  const favorites = res.locals.favorites

  res.render("account/favorites", {
    title: "My Favorites",
    nav,
    favorites,
  })
}

module.exports = { buildAddFavorite, addFavorite, buildViewFavorites, viewFavorites }