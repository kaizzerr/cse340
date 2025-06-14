const pool = require("../database/")

/* ****************************************
* Add favorites
**************************************** */
async function addFavorite(account_id, inv_id) {
  const sql = `
    INSERT INTO favorites (account_id, inv_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `
  return await pool.query(sql, [account_id, inv_id])
}

/* ****************************************
* Get favorites by their user id
**************************************** */
async function getFavoritesByUser(account_id) {
  const sql = `
    SELECT inv.*
    FROM favorites
    JOIN inventory AS inv ON favorites.inv_id = inv.inv_id
    WHERE favorites.account_id = $1
  `
  const result = await pool.query(sql, [account_id])
  return result.rows
}

module.exports = { addFavorite, getFavoritesByUser }