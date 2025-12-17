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

  async search({ pharmacyName, genericName, brandName, form, manufacturer }) {
    let query = `
      SELECT m.*, p.name AS pharmacyName
      FROM medication m
      LEFT JOIN pharmacy_medication pm ON m.medicationID = pm.medicationID
      LEFT JOIN pharmacy p ON pm.pharmacyID = p.pharmacyID
      WHERE 1=1
    `;
    const params = [];

    if (pharmacyName) {
      query += ' AND p.name LIKE ?';
      params.push(`%${pharmacyName}%`);
    }
    if (genericName) {
      query += ' AND m.genericName LIKE ?';
      params.push(`%${genericName}%`);
    }
    if (brandName) {
      query += ' AND m.brandName LIKE ?';
      params.push(`%${brandName}%`);
    }
    if (form) {
      query += ' AND m.form LIKE ?';
      params.push(`%${form}%`);
    }
    if (manufacturer) {
      query += ' AND m.manufacturer LIKE ?';
      params.push(`%${manufacturer}%`);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }
};

module.exports = Medication;
