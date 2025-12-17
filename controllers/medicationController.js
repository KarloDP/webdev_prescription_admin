const Medication = require('../models/medicationModel');

async function showMedications(req, res, next) {
  try {
    const medications = await Medication.getAll();
    res.render('pages/medications', { medications });
  } catch (err) {
    console.error('Medication Error:', err);
    next(err);
  }
}

async function filterByPharmacyName(req, res, next) {
  try {
    const { pharmacyName } = req.query;
    const medications = await Medication.getByPharmacyName(pharmacyName);

    res.render('pages/medicationsByPharmacy', { medications, pharmacyName });
  } catch (err) {
    console.error('Medication Filter Error:', err);
    next(err);
  }
}

module.exports = {
  showMedications,
  filterByPharmacyName
};
