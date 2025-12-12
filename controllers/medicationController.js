const Medication = require('../models/medicationModel');

async function showMedications(req, res, next) {
  try {
    const medications = await Medication.getAll();

    let html = `
      <h1>Medications</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th><th>Generic Name</th><th>Brand Name</th>
            <th>Form</th><th>Strength</th><th>Manufacturer</th><th>Stock</th>
          </tr>
        </thead>
        <tbody>
    `;

    medications.forEach(med => {
      html += `
        <tr>
          <td>${med.medicationID}</td>
          <td>${med.genericName}</td>
          <td>${med.brandName}</td>
          <td>${med.form}</td>
          <td>${med.strength} mg</td>
          <td>${med.manufacturer}</td>
          <td>${med.stock ?? 'N/A'}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>

      <h2>Filter by Pharmacy Name</h2>
      <form method="GET" action="/medications/filter">
        <input type="text" name="pharmacyName" placeholder="Enter Pharmacy Name" required>
        <button type="submit">Filter</button>
      </form>

      <br><a href="/dashboard">Back to Dashboard</a>
    `;

    res.send(html);
  } catch (err) {
    console.error('Medication Error:', err);
    next(err);
  }
}

async function filterByPharmacyName(req, res, next) {
  try {
    const { pharmacyName } = req.query;
    const medications = await Medication.getByPharmacyName(pharmacyName);

    if (!medications || medications.length === 0) {
      return res.status(404).send(`
        <h2>No Medications Found</h2>
        <p>Pharmacy "${pharmacyName}" does not exist or has no medications assigned.</p>
        <br><a href="/medications">Back to All Medications</a>
      `);
    }

    let html = `
      <h1>Medications at ${pharmacyName}</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th><th>Generic Name</th><th>Brand Name</th>
            <th>Form</th><th>Strength</th><th>Manufacturer</th><th>Stock</th>
          </tr>
        </thead>
        <tbody>
    `;

    medications.forEach(med => {
      html += `
        <tr>
          <td>${med.medicationID}</td>
          <td>${med.genericName}</td>
          <td>${med.brandName}</td>
          <td>${med.form}</td>
          <td>${med.strength} mg</td>
          <td>${med.manufacturer}</td>
          <td>${med.stock ?? 'N/A'}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
      <br><a href="/medications">Back to All Medications</a>
    `;

    res.send(html);
  } catch (err) {
    console.error('Medication Filter Error:', err);
    next(err);
  }
}

module.exports = {
  showMedications,
  filterByPharmacyName
};
