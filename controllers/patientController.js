const Patient = require('../models/patientModel');

async function deletePatient(req, res, next) {
  try {
    const { patientID } = req.body;
    await Patient.deletePatient(patientID);
    res.redirect('/patients');
  } catch (err) {
    next(err);
  }
}

async function addPatient(req, res, next) {
  try {
    const { firstName, lastName, password, birthDate, email, gender, contactNumber, address, doctorID } = req.body;
    await Patient.addPatient({ firstName, lastName, password, birthDate, email, gender, contactNumber, address, doctorID });
    res.redirect('/patients');
  } catch (err) {
    next(err);
  }
}

async function showPatients(req, res, next) {
  try {
    const { name, email, doctorID, gender } = req.query;
    let patients;

    if (name || email || doctorID || gender) {
      patients = await Patient.search({ name, email, doctorID, gender });
    } else {
      patients = await Patient.getAll();
    }

    res.render('pages/patients', { patients, name, email, doctorID, gender });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  showPatients,
  addPatient,
  deletePatient
};
   