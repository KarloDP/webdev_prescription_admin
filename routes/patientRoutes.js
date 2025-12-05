const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Get all patients
router.get('/', patientController.getAllPatients);

// Add a patient
router.post('/add', patientController.addPatient);

// Delete a patient
router.post('/delete', patientController.deletePatient);

module.exports = router;
