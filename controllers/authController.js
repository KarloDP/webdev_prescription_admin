const Admin = require('../models/adminModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Medication = require('../models/medicationModel');
const Pharmacy = require('../models/pharmacyModel');
const Prescription = require('../models/prescriptionModel');
const PrescriptionItem = require('../models/prescriptionItemModel');
const DispenseRecord = require('../models/dispenseRecordModel');

// Show login form
async function showLoginForm(req, res, next) {
  try {
    const admins = await Admin.getAll();
    res.render('login', { admins, error: null });
  } catch (err) {
    next(err);
  }
}

// Handle login with password
async function login(req, res, next) {
  try {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      const admins = await Admin.getAll();
      return res.render('login', { admins, error: 'Admin and password are required.' });
    }

    const admin = await Admin.verifyPassword(adminId, password);
    if (!admin) {
      const admins = await Admin.getAll();
      return res.render('login', { admins, error: 'Invalid credentials or inactive admin.' });
    }

    // Save session
    req.session.admin = admin;
    req.session.adminID = admin.adminID;
    res.redirect('/dashboard');
  } catch (err) {
    next(err);
  }
}

// Show dashboard
async function showDashboard(req, res, next) {
  try {
    if (!req.session.admin) return res.redirect('/login');

    const [
      admins,
      doctors,
      patients,
      medications,
      pharmacies,
      prescriptions,
      prescriptionItems,
      dispenseRecords
    ] = await Promise.all([
      Admin.getAll(),
      Doctor.getAll(),
      Patient.getAll(),
      Medication.getAll(),
      Pharmacy.getAll(),
      Prescription.getAll(),
      PrescriptionItem.getAll(),
      DispenseRecord.getAll()
    ]);

    const tables = [
      { name: 'Admins',              count: admins.length,            link: '/admins' },
      { name: 'Doctors',             count: doctors.length,           link: '/doctors' },
      { name: 'Patients',            count: patients.length,          link: '/patients' },
      { name: 'Medications',         count: medications.length,       link: '/medications' },
      { name: 'Pharmacies',          count: pharmacies.length,        link: '/pharmacies' },
      { name: 'Prescriptions',       count: prescriptions.length,     link: '/prescriptions' },
      { name: 'Prescription Items',  count: prescriptionItems.length, link: '/prescription-items' },
      { name: 'Dispense Records',    count: dispenseRecords.length,   link: '/dispense-records' }
    ];

    res.render('pages/dashboard/dashboard', {
      admin: req.session.admin,
      tables
    });
  } catch (err) {
    next(err);
  }
}

// Handle logout
function logout(req, res, next) {
  try {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  } catch (err) {
    next(err);
  }
}

// Register new admin (pending status)
async function registerAdmin(req, res, next) {
  try {
    const { firstName, lastName, password } = req.body;

    if (!firstName || !lastName || !password) {
      return res.render('register', { error: 'All fields are required.' });
    }

    await Admin.registerAdmin({ firstName, lastName, password });
    res.redirect('/login');
  } catch (err) {
    console.error('Admin Register Error:', err);
    next(err);
  }
}

// ✨ SINGLE CLEAR EXPORT ✨
module.exports = {
  showLoginForm,
  login,
  showDashboard,
  logout,
  registerAdmin
};
