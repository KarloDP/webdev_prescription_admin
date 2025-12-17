const PrescriptionItem = require('../models/prescriptionItemModel');

async function showPrescriptionItems(req, res, next) {
  try {
    const { doctorID, prescriptionID, medicationID, dosage, frequency } = req.query;
    let items;

    if (doctorID || prescriptionID || medicationID || dosage || frequency) {
      items = await PrescriptionItem.search({ doctorID, prescriptionID, medicationID, dosage, frequency });
    } else {
      items = await PrescriptionItem.getAll();
    }

    res.render('pages/prescriptionItems', { items, doctorID, prescriptionID, medicationID, dosage, frequency });
  } catch (err) {
    next(err);
  }
}

async function showByPrescription(req, res, next) {
  try {
    const { prescriptionID } = req.params;
    const items = await PrescriptionItem.getByPrescription(prescriptionID);
    res.render('pages/prescriptionItemsByPrescription', { items, prescriptionID });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  showPrescriptionItems,
  showByPrescription
};
