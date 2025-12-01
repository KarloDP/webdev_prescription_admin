// controllers/authController.js
const Admin = require('../models/adminModel');

// GET /login
exports.showLoginForm = async (req, res) => {
  try {
    const admins = await Admin.getAll();
    res.render('login', { admins, error: null });
  } catch (err) {
    console.error('showLoginForm error:', err);   // <--- add this line
    res.status(500).send('Error loading login page');
  }
};

// POST /login
exports.login = async (req, res) => {
  try {
    const { adminId } = req.body;

    if (!adminId) {
      const admins = await Admin.getAll();
      return res.render('login', {
        admins,
        error: 'Please select an admin.'
      });
    }

    const admin = await Admin.getById(adminId);
    if (!admin) {
      const admins = await Admin.getAll();
      return res.render('login', {
        admins,
        error: 'Admin not found.'
      });
    }

    // Save admin in session
    req.session.admin = admin;
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Login error');
  }
};

// GET /dashboard
exports.showDashboard = (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/login');
  }

  res.render('dashboard', { admin: req.session.admin });
};

// GET /logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
