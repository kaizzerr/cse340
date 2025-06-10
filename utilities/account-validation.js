const utilities = require(".")
const { body, validationResult } = require("express-validator")
const accountModel = require("../models/account-model")

const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.registrationRules = () => {
    return [
      // firstname is required and must be string
      body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.
  
      // lastname is required and must be string
      body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), // on error this message is sent.
  
      // valid email is required and cannot already exist in the database
      body("account_email")
        .trim()
        .isEmail()
        .normalizeEmail() // refer to validator.js docs
        .withMessage("A valid email is required.")
        .custom(async (account_email) => {
          const emailExists = await accountModel.checkExistingEmail(account_email)
          if (emailExists){
            throw new Error("Email exists. Please log in or use different email")
          }
        }), 
  
      // password is required and must be strong password
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Password does not meet requirements."),
    ]
  }

  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("account/register", {
        errors,
        title: "Registration",
        nav,
        account_firstname,
        account_lastname,
        account_email,
      })
      return
    }
    next()
  }

/* ******************************
 * Login Validation Rules
 * ***************************** */
validate.loginRules = () => {
  return [
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email."),
    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Password is required."),
  ]
}

/* ******************************
 * Login Data Check
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    })
    return
  }
  next()
}

/* ******************************
 * Account Update Validation Rules
 * ***************************** */
validate.updateRules = () => {
  return [
    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("First name is required.")
      .isLength({ min: 1 })
      .withMessage("First name must be at least 1 character."),

    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Last name is required.")
      .isLength({ min: 1 })
      .withMessage("Last name must be at least 1 character."),

    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required.")
  ]
}

/* ******************************
 * Check Account Update Data
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { first_name, last_name, email, account_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    const accountData = {
      account_id,
      first_name,
      last_name,
      email
    }
    return res.render("account/update", {
      title: "Update Account",
      errors,
      accountData
    })
  }
  next()
}

/* ******************************
 * Password Change Validation Rules
 * ***************************** */
validate.passwordRules = () => {
  return [
    body("password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password must be at least 12 characters and include 1 number, 1 capital letter, and 1 special character."),
  ]
}

/* ******************************
 * Check Password Data
 * ***************************** */
validate.checkPasswordData = async (req, res, next) => {
  const { account_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    const accountData = await accountModel.getAccountById(account_id)
    return res.render("account/update", {
      title: "Update Account",
      errors,
      accountData,
    })
  }
  next()
}

module.exports = validate