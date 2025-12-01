// controllers/authController.js
const Admin = require('../models/adminModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Medication = require('../models/medicationModel');
const Pharmacy = require('../models/pharmacyModel');
const Prescription = require('../models/prescriptionModel');
const PrescriptionItem = require('../models/prescriptionItemModel');
const DispenseRecord = require('../models/dispenseRecordModel');


// GET /login (show login page)
exports.showLoginForm = async (req, res) => {
  try {
    const admins = await Admin.getAll(); // fetch all admins for dropdown
    res.render('login', { admins, error: null });
  } catch (err) {
    console.error('showLoginForm error:', err);
    res.status(500).send('Error loading login page');
  }
};

// POST /login (validate & log in)
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
    console.error('Login error:', err);
    res.status(500).send('Login error');
  }
};

// GET /dashboard (main page after login)
exports.showDashboard = async (req, res) => {
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
    { name: 'Admins', count: admins.length, link: '/admins' },
    { name: 'Doctors', count: doctors.length, link: '/doctors' },
    { name: 'Patients', count: patients.length, link: '/patients' },
    { name: 'Medications', count: medications.length, link: '/medications' },
    { name: 'Pharmacies', count: pharmacies.length, link: '/pharmacies' },
    { name: 'Prescriptions', count: prescriptions.length, link: '/prescriptions' },
    { name: 'Prescription Items', count: prescriptionItems.length, link: '/prescription-items' },
    { name: 'Dispense Records', count: dispenseRecords.length, link: '/dispense-records' },
  ];

  res.render('pages/dashboard/dashboard', {
    admin: req.session.admin,
    tables     // <-- single array!!
  });
};

// GET /logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
