const Medication = require('../models/medicationModel');

async function showMedications(req, res, next) {
  try {
    const { pharmacyName, genericName, brandName, form, manufacturer } = req.query;
    let medications;

    if (pharmacyName || genericName || brandName || form || manufacturer) {
      medications = await Medication.search({ pharmacyName, genericName, brandName, form, manufacturer });
    } else {
      medications = await Medication.getAll();
    }

    res.render('pages/medications', { medications, pharmacyName, genericName, brandName, form, manufacturer });
  } catch (err) {
    console.error('Medication Error:', err);
    next(err);
  }
}

module.exports = {
  showMedications
};
