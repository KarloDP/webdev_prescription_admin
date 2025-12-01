const pool = require('../config/db');

const DispenseRecord = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM dispenserecord');
    return rows;
  }
};

module.exports = DispenseRecord;