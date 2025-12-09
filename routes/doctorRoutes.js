const express = require('express');
const router = express.Router();
const { showDoctors, acceptDoctor, addDoctor } = require('../controllers/doctorController');

// Show all doctors
router.get('/doctors', showDoctors);

// Accept doctor application
router.post('/doctors/accept', acceptDoctor);

// Add new doctor
router.post('/doctors/add', addDoctor);

module.exports = router;
