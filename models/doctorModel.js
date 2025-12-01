const pool = require('../config/db');

const Doctor = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM doctor');
    return rows;
  }
};

module.exports = Doctor;
