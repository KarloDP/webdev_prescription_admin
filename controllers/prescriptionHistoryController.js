const PrescriptionHistory = require('../models/prescriptionHistoryModel');

async function showHistory(req, res, next) {
  try {
    const { id } = req.params; // prescriptionID from route
    const history = await PrescriptionHistory.getByPrescriptionId(id);
    res.render('pages/prescriptions/prescriptionHistory', {
      prescriptionID: id,
      history
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { showHistory };