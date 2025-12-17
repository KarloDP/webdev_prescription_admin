const pool = require('../config/db');

const PrescriptionHistory = {
  async getByPrescriptionId(prescriptionID) {
    const [rows] = await pool.query(
      `SELECT 
         dr.dispenseID,
         dr.dispenseDate,
         dr.dispensedQuantity,
         m.brandName,
         p.name AS pharmacyName
       FROM dispenseRecord dr
       JOIN medication m ON dr.medicationID = m.medicationID
       JOIN pharmacy p ON dr.pharmacyID = p.pharmacyID
       WHERE dr.prescriptionID = ?
       ORDER BY dr.dispenseDate DESC`,
      [prescriptionID]
    );
    return rows;
  }
};

module.exports = PrescriptionHistory;
