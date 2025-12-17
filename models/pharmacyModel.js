const pool = require('../config/db');

const Pharmacy = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM pharmacy');
    return rows;
  },

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

  async addPharmacy({ name, password, address, contactNumber, email, clinicAddress }) {
    await pool.query(
      `INSERT INTO pharmacy (name, password, address, contactNumber, email, clinicAddress, status)
       VALUES (?, ?, ?, ?, ?, ?, "pending")`,
      [name, password, address, contactNumber, email, clinicAddress]
    );
  },

  async approve(pharmacyID) {
    await pool.query('UPDATE pharmacy SET status = "active" WHERE pharmacyID = ?', [pharmacyID]);
  },

  async deny(pharmacyID) {
    await pool.query('DELETE FROM pharmacy WHERE pharmacyID = ?', [pharmacyID]);
  },

  async deactivate(pharmacyID) {
    await pool.query('UPDATE pharmacy SET status = "inactive" WHERE pharmacyID = ?', [pharmacyID]);
  },

  async activate(pharmacyID) {
    await pool.query('UPDATE pharmacy SET status = "active" WHERE pharmacyID = ?', [pharmacyID]);
  },

  async delete(pharmacyID) {
    await pool.query('DELETE FROM pharmacy WHERE pharmacyID = ?', [pharmacyID]);
  }
};

module.exports = Pharmacy;
