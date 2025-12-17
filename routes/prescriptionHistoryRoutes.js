const express = require('express');
const router = express.Router();
const { showHistory } = require('../controllers/prescriptionHistoryController');

router.get('/prescriptions/:id/history', showHistory);

module.exports = router;