const pool = require('../config/db');

const DispenseRecord = {
  // Get all dispense records
  async getAll() {
    const [rows] = await pool.query(`
      SELECT dr.dispenseID, dr.dispenseDate, dr.dispensedQuantity,
             pi.prescriptionID,
             m.brandName, m.genericName,
             ph.name AS pharmacyName
      FROM dispenserecord dr
      JOIN prescriptionitem pi ON dr.prescriptionItemID = pi.prescriptionItemID
      JOIN medication m ON pi.medicationID = m.medicationID
      JOIN pharmacy ph ON dr.pharmacyID = ph.pharmacyID
      ORDER BY dr.dispenseDate DESC
    `);
    return rows;
  },

  // Get dispense records for a specific prescription
  async getByPrescription(prescriptionID) {
    const [rows] = await pool.query(`
      SELECT dr.dispenseID, dr.dispenseDate, dr.dispensedQuantity,
             m.brandName, m.genericName,
             ph.name AS pharmacyName
      FROM dispenserecord dr
      JOIN prescriptionitem pi ON dr.prescriptionItemID = pi.prescriptionItemID
      JOIN medication m ON pi.medicationID = m.medicationID
      JOIN pharmacy ph ON dr.pharmacyID = ph.pharmacyID
      WHERE pi.prescriptionID = ?
      ORDER BY dr.dispenseDate DESC
    `, [prescriptionID]);
    return rows;
  }
};

module.exports = DispenseRecord;
