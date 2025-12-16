const pool = require('../config/db');

const Medication = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT m.*, p.name AS pharmacyName
      FROM medication m
      LEFT JOIN pharmacy_medication pm ON m.medicationID = pm.medicationID
      LEFT JOIN pharmacy p ON pm.pharmacyID = p.pharmacyID
    `);
    return rows;
  },

  async getByPharmacyName(pharmacyName) {
    const [rows] = await pool.query(`
      SELECT m.*, p.name AS pharmacyName
      FROM medication m
      JOIN pharmacy_medication pm ON m.medicationID = pm.medicationID
      JOIN pharmacy p ON pm.pharmacyID = p.pharmacyID
      WHERE p.name = ?
    `, [pharmacyName]);
    return rows;
  }
};

module.exports = Medication;
