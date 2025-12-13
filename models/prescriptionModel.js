const pool = require('../config/db');

const Prescription = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT pr.prescriptionID, pr.issueDate, pr.expirationDate, pr.status,
             CONCAT(p.firstName, ' ', p.lastName) AS patientName,
             CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
             GROUP_CONCAT(
               CONCAT(m.brandName, ' (', pi.dosage, ', ', pi.frequency, ', ', pi.duration, ')')
               SEPARATOR '; '
             ) AS medications
      FROM prescription pr
      JOIN patient p ON pr.patientID = p.patientID
      JOIN doctor d ON pr.doctorID = d.doctorID
      JOIN prescriptionitem pi ON pr.prescriptionID = pi.prescriptionID
      JOIN medication m ON pi.medicationID = m.medicationID
      GROUP BY pr.prescriptionID
      ORDER BY pr.issueDate DESC
    `);
    return rows;
  },

  async searchByName(searchTerm) {
    let sql = `
      SELECT pr.prescriptionID, pr.issueDate, pr.expirationDate, pr.status,
             CONCAT(p.firstName, ' ', p.lastName) AS patientName,
             CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
             GROUP_CONCAT(
               CONCAT(m.brandName, ' (', pi.dosage, ', ', pi.frequency, ', ', pi.duration, ')')
               SEPARATOR '; '
             ) AS medications
      FROM prescription pr
      JOIN patient p ON pr.patientID = p.patientID
      JOIN doctor d ON pr.doctorID = d.doctorID
      JOIN prescriptionitem pi ON pr.prescriptionID = pi.prescriptionID
      JOIN medication m ON pi.medicationID = m.medicationID
      WHERE CONCAT(p.firstName, ' ', p.lastName) LIKE ?
         OR CONCAT(d.firstName, ' ', d.lastName) LIKE ?
         OR m.brandName LIKE ?
      GROUP BY pr.prescriptionID
      ORDER BY pr.issueDate DESC
    `;
    const likeTerm = `%${searchTerm}%`;
    const [rows] = await pool.query(sql, [likeTerm, likeTerm, likeTerm]);
    return rows;
  }
};

module.exports = Prescription;
