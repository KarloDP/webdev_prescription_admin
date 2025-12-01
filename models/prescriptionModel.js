const pool = require('../config/db');

const Prescription = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM prescription');
    return rows;
  }
};
module.exports = Prescription;