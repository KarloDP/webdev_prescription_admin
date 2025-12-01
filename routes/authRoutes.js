// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// When the user opens /login → render login page
router.get('/login', authController.showLoginForm);

// When they POST login → process form & login
router.post('/login', authController.login);

// When user opens /dashboard → show greeting
router.get('/dashboard', authController.showDashboard);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;