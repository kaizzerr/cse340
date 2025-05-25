const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  View vehicles by inventory detail view
 * ************************** */
invCont.buildDetailView = async function (req, res, next) {
  const invId = req.params.invId
  try {
    const vehicle = await invModel.getVehicleById(invId)
    const detailHtml = utilities.buildDetailView(vehicle)
    const nav = await utilities.getNav()
    const title = `${vehicle.inv_make} ${vehicle.inv_model}`
    res.render("inventory/inventory-detail", {
      title,
      nav,
      detailHtml
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont