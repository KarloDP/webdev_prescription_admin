const pool = require('../config/db');

const Medication = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM medication');
    return rows;
  }
};
module.exports = Medication;