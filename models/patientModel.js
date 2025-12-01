const pool = require('../config/db');

const Patient = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM patient');
    return rows;
  }
};
module.exports = Patient;