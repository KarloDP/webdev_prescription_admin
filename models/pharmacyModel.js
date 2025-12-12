const pool = require('../config/db');

const Pharmacy = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM pharmacy');
    return rows;
  },

  async addPharmacy({ name, address, contactNumber }) {
    await pool.query(
      `INSERT INTO pharmacy (name, address, contactNumber, status)
       VALUES (?, ?, ?, "active")`,
      [name, address, contactNumber]
    );
  },

  async deactivatePharmacy(pharmacyID) {
    await pool.query('UPDATE pharmacy SET status = "inactive" WHERE pharmacyID = ?', [pharmacyID]);
  },

  async deletePharmacy(pharmacyID) {
    await pool.query('DELETE FROM pharmacy WHERE pharmacyID = ?', [pharmacyID]);
  }
};

module.exports = Pharmacy;
