const express = require('express');
const router = express.Router();
const { showMedications } = require('../controllers/medicationController');

router.get('/medications', showMedications);

module.exports = router;
