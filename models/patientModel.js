
const pool = require('../config/db');

const Patient = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM patient');
    return rows;
  },

  async add(data) {
    const { firstName, lastName, password, birthDate, gender, contactNumber, address, email } = data;
    await pool.query(
      'INSERT INTO patient (firstName, lastName, password, birthDate, gender, contactNumber, address, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, password, birthDate, gender, contactNumber, address, email]
    );
  },

  async delete(patientID) {
    await pool.query('DELETE FROM patient WHERE patientID = ?', [patientID]);
  }
};

module.exports = Patient;