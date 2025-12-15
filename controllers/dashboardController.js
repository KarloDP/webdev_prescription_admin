const Admin = require('../models/adminModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Pharmacy = require('../models/pharmacyModel');
const Medication = require('../models/medicationModel');
const Prescription = require('../models/prescriptionModel');

async function showDashboard(req, res, next) {
  try {
    const [adminCount, doctorCount, patientCount, pharmacyCount, medicationCount, prescriptionCount] = await Promise.all([
      Admin.getAll().then(list => list.length),
      Doctor.getAll().then(list => list.length),
      Patient.getAll().then(list => list.length),
      Pharmacy.getAll().then(list => list.length),
      Medication.getAll().then(list => list.length),
      Prescription.getAll().then(list => list.length)
    ]);

    const tables = [
      { name: 'Doctors', count: doctorCount, link: '/doctors' },
      { name: 'Patients', count: patientCount, link: '/patients' },
      { name: 'Pharmacies', count: pharmacyCount, link: '/pharmacies' },
      { name: 'Medicines', count: medicationCount, link: '/medicines' },
      { name: 'Prescriptions', count: prescriptionCount, link: '/prescriptions' }
    ];

    res.render('dashboard/dashboard', {
      admin: req.session.admin,
      tables,
      adminCount
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { showDashboard };
