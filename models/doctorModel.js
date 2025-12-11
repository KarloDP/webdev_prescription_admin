const pool = require('../config/db');

const Doctor = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM doctor');
    return rows;
  },

  async getPendingApplications() {
    const [rows] = await pool.query('SELECT * FROM doctor WHERE status = "pending"');
    return rows;
  },

  async activateDoctor(doctorID) {
    await pool.query('UPDATE doctor SET status = "active" WHERE doctorID = ?', [doctorID]);
  },

  async deactivateDoctor(doctorID) {
    await pool.query('UPDATE doctor SET status = "pending" WHERE doctorID = ?', [doctorID]);
  },

  async deleteDoctor(doctorID) {
    await pool.query('DELETE FROM doctor WHERE doctorID = ?', [doctorID]);
  },

  async addDoctor({ firstName, lastName, password, specialization, licenseNumber, email, clinicAddress }) {
    await pool.query(
      `INSERT INTO doctor
       (firstName, lastName, password, specialization, licenseNumber, email, clinicAddress, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, "pending")`,
      [firstName, lastName, password, specialization, licenseNumber, email, clinicAddress]
    );
  }
};

module.exports = Doctor;
