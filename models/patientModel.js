const pool = require('../config/db');

const Patient = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM patient');
    return rows;
  },

  async search({ name, email, doctorID, gender }) {
    let query = 'SELECT * FROM patient WHERE 1=1';
    const params = [];

    if (name) {
      query += ' AND (firstName LIKE ? OR lastName LIKE ?)';
      params.push(`%${name}%`, `%${name}%`);
    }
    if (email) {
      query += ' AND email LIKE ?';
      params.push(`%${email}%`);
    }
    if (doctorID) {
      query += ' AND doctorID = ?';
      params.push(doctorID);
    }
    if (gender) {
      query += ' AND gender = ?';
      params.push(gender);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  },

  async addPatient({ firstName, lastName, password, birthDate, email, gender, contactNumber, address, doctorID }) {
    await pool.query(
      `INSERT INTO patient
       (firstName, lastName, password, birthDate, email, gender, contactNumber, address, doctorID)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, password, birthDate, email, gender, contactNumber, address, doctorID]
    );
  },

  async deletePatient(patientID) {
    await pool.query('DELETE FROM patient WHERE patientID = ?', [patientID]);
  }
};

module.exports = Patient;
