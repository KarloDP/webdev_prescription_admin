const express = require('express');
const router = express.Router();
const {
  showPharmacies,
  addPharmacy,
  deactivatePharmacy,
  deletePharmacy
} = require('../controllers/pharmacyController');

router.get('/pharmacies', showPharmacies);
router.post('/pharmacies/add', addPharmacy);
router.post('/pharmacies/deactivate', deactivatePharmacy);
router.post('/pharmacies/delete', deletePharmacy);

module.exports = router;
