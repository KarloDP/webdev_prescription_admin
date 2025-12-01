const pool = require('../config/db');

const PrescriptionItem = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM prescriptionitem');
    return rows;
  }
};
module.exports = PrescriptionItem;