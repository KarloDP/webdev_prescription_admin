const pool = require('../config/db');

const Pharmacy = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM pharmacy');
    return rows;
  }
};
module.exports = Pharmacy;
