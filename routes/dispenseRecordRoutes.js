const express = require('express');
const router = express.Router();
const { showByPrescription, showAll } = require('../controllers/dispenseRecordController');

router.get('/prescriptions/:id/dispense-records', showByPrescription);
router.get('/dispense-records', showAll);

module.exports = router;
