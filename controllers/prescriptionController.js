const Prescription = require('../models/prescriptionModel');

async function showPrescriptions(req, res, next) {
  try {
    const { patient, doctor, medication, status } = req.query;
    let prescriptions;

    if (patient || doctor || medication || status) {
      prescriptions = await Prescription.search({ patient, doctor, medication, status });
    } else {
      prescriptions = await Prescription.getAll();
    }

    res.render('pages/prescriptions', { prescriptions, patient, doctor, medication, status });
  } catch (err) {
    next(err);
  }
}

async function showHistory(req, res, next) {
  try {
    const { id } = req.params;
    const history = await Prescription.getDispenseHistory(id);
    res.render('pages/prescriptionHistory', { history, prescriptionID: id });
  } catch (err) {
    next(err);
  }
}

module.exports = { showPrescriptions, showHistory };
