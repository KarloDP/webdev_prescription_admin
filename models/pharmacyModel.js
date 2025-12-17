const pool = require('../config/db');

const Pharmacy = {
  // Get all pharmacies
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM pharmacy');
    return rows;
  },

  // Flexible search by name, email, or status
  async search({ name, email, status }) {
    let query = 'SELECT * FROM pharmacy WHERE 1=1';
    const params = [];

    if (name) {
      query += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }
    if (email) {
      query += ' AND email LIKE ?';
      params.push(`%${email}%`);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  },

  // Add a new pharmacy (defaults to pending status)
  async addPharmacy({ name, password, address, contactNumber, email, clinicAddress }) {
    await pool.query(
      `INSERT INTO pharmacy (name, password, address, contactNumber, email, clinicAddress, status)
       VALUES (?, ?, ?, ?, ?, ?, "pending")`,
      [name, password, address, contactNumber, email, clinicAddress]
    );
  },

  // Approve pharmacy (set status to active)
  async approve(pharmacyID) {
    await pool.query('UPDATE pharmacy SET status = "active" WHERE pharmacyID = ?', [pharmacyID]);
  },

  // Deny pharmacy (delete record)
  async deny(pharmacyID) {
    await pool.query('DELETE FROM pharmacy WHERE pharmacyID = ?', [pharmacyID]);
  },

  // Deactivate pharmacy (set status to inactive)
  async deactivate(pharmacyID) {
    await pool.query('UPDATE pharmacy SET status = "inactive" WHERE pharmacyID = ?', [pharmacyID]);
  },

  // Activate pharmacy (set status to active)
  async activate(pharmacyID) {
    await pool.query('UPDATE pharmacy SET status = "active" WHERE pharmacyID = ?', [pharmacyID]);
  },

  // Delete pharmacy
  async delete(pharmacyID) {
    await pool.query('DELETE FROM pharmacy WHERE pharmacyID = ?', [pharmacyID]);
  }
};

module.exports = Pharmacy;
