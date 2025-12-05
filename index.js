const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));

// 👇 Serve static files FIRST
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Your routes AFTER static

app.use('/', authRoutes);
app.use('/patients', patientRoutes);

// Default redirect to /login
app.get('/', (req, res) => res.redirect('/login'));

const PORT = process.env.PORT || 8080;

app.use((err, req, res, next) => {
  console.error('\n🔥 SERVER ERROR:', err.stack); // full stack trace
  res.status(500).send(`
    <h2>Server Error</h2>
    <pre>${err.stack}</pre>
  `);
});

app.use((req, res) => {
  res.status(404).send(`
    <h2>404 - Page Not Found</h2>
    <p>URL: ${req.originalUrl}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
