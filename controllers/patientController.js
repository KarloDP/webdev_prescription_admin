const patientModel = require('../models/patientModel');

module.exports = {
  async getAllPatients(req, res) {
    try {
      const patients = await patientModel.getAll();
      res.render('pages/patients', { patients });
    } catch (err) {
      res.status(500).send('Error fetching patients');
    }
  },

  async addPatient(req, res) {
    try {
      const patientData = req.body;
      await patientModel.add(patientData);
      res.redirect('/patients');
    } catch (err) {
      res.status(500).send('Error adding patient');
    }
  },

  async deletePatient(req, res) {
    try {
      const { patientID } = req.body;
      await patientModel.delete(patientID);
      res.redirect('/patients');
    } catch (err) {
      res.status(500).send('Error deleting patient');
    }
  }
};
