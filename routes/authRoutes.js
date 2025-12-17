// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const {
  showLoginForm,
  login,
  showDashboard,
  logout,
  registerAdmin
} = require('../controllers/authController');

// Routes
router.get('/login', showLoginForm);
router.post('/login', login);
router.get('/dashboard', showDashboard);
router.get('/logout', logout);

// Registration routes
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});
router.post('/register', registerAdmin);

module.exports = router;
