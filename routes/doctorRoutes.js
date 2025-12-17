const express = require('express');
const router = express.Router();

const {
  showDoctors,
  acceptDoctor,
  addDoctor,
  deactivateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

router.get('/doctors', showDoctors);
router.post('/doctors/accept', acceptDoctor);
router.post('/doctors/add', addDoctor);
router.post('/doctors/deactivate', deactivateDoctor);
router.post('/doctors/delete', deleteDoctor);

module.exports = router;
