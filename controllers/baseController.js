const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  let nav = await utilities.getNav(req)
  res.render("index", {title: "Home", nav})
}

module.exports = baseController