// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const Admin = require('../models/adminModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Medication = require('../models/medicationModel');
const Pharmacy = require('../models/pharmacyModel');
const Prescription = require('../models/prescriptionModel');
const PrescriptionItem = require('../models/prescriptionItemModel');
const DispenseRecord = require('../models/dispenseRecordModel');

// Debug: check that we really have the functions
console.log('authController keys:', Object.keys(authController));

// show login form
router.get('/login', authController.showLoginForm);

// handle login submit
router.post('/login', authController.login);

// dashboard
router.get('/dashboard', authController.showDashboard);

// logout
router.get('/logout', authController.logout);

// Simple table pages

router.get('/admins', async (req, res) => {
  const admins = await Admin.getAll();
  res.render('pages/admins/index', { admins });
});

router.get('/doctors', async (req, res) => {
  const doctors = await Doctor.getAll();
  res.render('pages/doctors/index', { doctors });
});

router.get('/patients', async (req, res) => {
  const patients = await Patient.getAll();
  res.render('pages/patients/index', { patients });
});

router.get('/medications', async (req, res) => {
  const medications = await Medication.getAll();
  res.render('pages/medications/index', { medications });
});

router.get('/pharmacies', async (req, res) => {
  const pharmacies = await Pharmacy.getAll();
  res.render('pages/pharmacies/index', { pharmacies });
});

router.get('/prescriptions', async (req, res) => {
  const prescriptions = await Prescription.getAll();
  res.render('pages/prescriptions/index', { prescriptions });
});

router.get('/prescription-items', async (req, res) => {
  const items = await PrescriptionItem.getAll();
  res.render('pages/prescriptionItems/index', { items });
});

router.get('/dispense-records', async (req, res) => {
  const records = await DispenseRecord.getAll();
  res.render('pages/dispenseRecords/index', { records });
});


module.exports = router;