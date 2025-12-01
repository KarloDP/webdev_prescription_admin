// config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',        // <-- change if needed
  database: 'webdev_prescription'
});

module.exports = pool;
