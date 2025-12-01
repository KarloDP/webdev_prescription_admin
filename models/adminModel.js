// models/adminModel.js
const pool = require('../config/db');

const Admin = {
  async getAll() {
    const [rows] = await pool.query(
      'SELECT adminID, firstName, lastName FROM admins'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      'SELECT adminID, firstName, lastName FROM admins WHERE adminID = ?',
      [id]
    );
    return rows[0] || null;
  }
};

module.exports = Admin;