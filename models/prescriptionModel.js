const pool = require('../config/db');

const Prescription = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT pr.prescriptionID, pr.issueDate, pr.expirationDate, pr.status,
             CONCAT(p.firstName, ' ', p.lastName) AS patientName,
             CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
             GROUP_CONCAT(
               CONCAT(m.brandName, ' / ', m.genericName,
                      ' (', pi.dosage, ', ', pi.frequency, ', ', pi.duration, ')')
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

  async search({ patient, doctor, medication, status }) {
    let query = `
      SELECT pr.prescriptionID, pr.issueDate, pr.expirationDate, pr.status,
             CONCAT(p.firstName, ' ', p.lastName) AS patientName,
             CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
             GROUP_CONCAT(
               CONCAT(m.brandName, ' / ', m.genericName,
                      ' (', pi.dosage, ', ', pi.frequency, ', ', pi.duration, ')')
               SEPARATOR '; '
             ) AS medications
      FROM prescription pr
      JOIN patient p ON pr.patientID = p.patientID
      JOIN doctor d ON pr.doctorID = d.doctorID
      JOIN prescriptionitem pi ON pr.prescriptionID = pi.prescriptionID
      JOIN medication m ON pi.medicationID = m.medicationID
      WHERE 1=1
    `;
    const params = [];

    if (patient) {
      query += ' AND CONCAT(p.firstName, " ", p.lastName) LIKE ?';
      params.push(`%${patient}%`);
    }
    if (doctor) {
      query += ' AND CONCAT(d.firstName, " ", d.lastName) LIKE ?';
      params.push(`%${doctor}%`);
    }
    if (medication) {
      query += ' AND (m.brandName LIKE ? OR m.genericName LIKE ?)';
      params.push(`%${medication}%`, `%${medication}%`);
    }
    if (status) {
      query += ' AND pr.status = ?';
      params.push(status);
    }

    query += ' GROUP BY pr.prescriptionID ORDER BY pr.issueDate DESC';
    const [rows] = await pool.query(query, params);
    return rows;
  },

  async getDispenseHistory(prescriptionID) {
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

module.exports = Prescription;
