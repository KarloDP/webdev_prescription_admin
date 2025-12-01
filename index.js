const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

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

// Default redirect to /login
app.get('/', (req, res) => res.redirect('/login'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
