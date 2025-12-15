const pool = require('../config/db');

const Admin = {

  async getAll() {
    // Only show accepted admins
    const [rows] = await pool.query(
      'SELECT adminID, firstName, lastName FROM admins WHERE status = "accepted"'
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
      'SELECT adminID, firstName, lastName FROM admins WHERE adminID = ?',
      [id]
    );
    return rows[0] || null;
  },


  async addPendingAdmin({ firstName, lastName, password }) {
    await pool.query(
      'INSERT INTO admins (firstName, lastName, password, status) VALUES (?, ?, ?, "pending")',
      [firstName, lastName, password]
    );
  },

  async acceptAdmin(adminID) {
    await pool.query('UPDATE admins SET status = "accepted" WHERE adminID = ?', [adminID]);
  },

  async deleteAdmin(adminID) {
    await pool.query('DELETE FROM admins WHERE adminID = ?', [adminID]);
  }
};

module.exports = Admin;