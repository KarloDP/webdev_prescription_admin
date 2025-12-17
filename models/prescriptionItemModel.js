const pool = require('../config/db');

const PrescriptionItem = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM prescriptionitem');
    return rows;
  },

  async getByPrescription(prescriptionID) {
    const [rows] = await pool.query('SELECT * FROM prescriptionitem WHERE prescriptionID = ?', [prescriptionID]);
    return rows;
  },

  async search({ doctorID, prescriptionID, medicationID, dosage, frequency }) {
    let query = 'SELECT * FROM prescriptionitem WHERE 1=1';
    const params = [];

    if (doctorID) {
      query += ' AND doctorID = ?';
      params.push(doctorID);
    }
    if (prescriptionID) {
      query += ' AND prescriptionID = ?';
      params.push(prescriptionID);
    }
    if (medicationID) {
      query += ' AND medicationID = ?';
      params.push(medicationID);
    }
    if (dosage) {
      query += ' AND dosage LIKE ?';
      params.push(`%${dosage}%`);
    }
    if (frequency) {
      query += ' AND frequency LIKE ?';
      params.push(`%${frequency}%`);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }
};

module.exports = PrescriptionItem;
