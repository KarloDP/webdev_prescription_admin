//handles connection to database
// Import the mysql2 module
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',     // Replace with your host
  user: 'root',          // Replace with your username
  password: '',          // Replace with your password
  database: 'webdev_prescription'       // Replace with your database name
});

// Connect to the database
connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database');
});

// Run a database query
connection.query('SELECT * FROM users', (error, results) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  }
  console.log('Query results:', results);
});

// Close the connection
connection.end();