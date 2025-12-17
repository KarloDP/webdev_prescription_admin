const pool = require('../config/db');

const Admin = {
  async getAll() {
    const [rows] = await pool.query(
      'SELECT adminID, firstName, lastName FROM admins WHERE status = "active"'
    );
    return rows;
  },

  async getPending() {
    const [rows] = await pool.query(
      'SELECT adminID, firstName, lastName FROM admins WHERE status = "pending"'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      'SELECT adminID, firstName, lastName, password, status FROM admins WHERE adminID = ?',
      [id]
    );
    return rows[0] || null;
  },

  async registerAdmin({ firstName, lastName, password }) {
    await pool.query(
      `INSERT INTO admins (firstName, lastName, password, status)
       VALUES (?, ?, ?, "pending")`,
      [firstName, lastName, password]
    );
  },

  async verifyPassword(adminID, password) {
    const [rows] = await pool.query(
      `SELECT adminID, firstName, lastName, status
       FROM admins
       WHERE adminID = ? AND password = ? AND status = "active"`,
      [adminID, password]
    );
    return rows[0] || null;
  },

  async acceptAdmin(adminID) {
    await pool.query('UPDATE admins SET status = "active" WHERE adminID = ?', [adminID]);
  },

  async rejectAdmin(adminID) {
    await pool.query('DELETE FROM admins WHERE adminID = ?', [adminID]);
  },

  async deleteAdmin(adminID) {
    await pool.query('DELETE FROM admins WHERE adminID = ?', [adminID]);
  }
};

module.exports = Admin;
