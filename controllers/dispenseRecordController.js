const DispenseRecord = require('../models/dispenseRecordModel');

// Show records for a specific prescription
async function showByPrescription(req, res, next) {
  try {
    const { id } = req.params;
    const records = await DispenseRecord.getByPrescription(id);

    let html = `<h1>Dispense Records for Prescription #${id}</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead><tr>
          <th>ID</th><th>Date Dispensed</th><th>Medication</th><th>Quantity</th><th>Pharmacy</th>
        </tr></thead><tbody>`;

    records.forEach(r => {
      html += `<tr>
        <td>${r.dispenseID}</td>
        <td>${r.dispenseDate}</td>
        <td>${r.brandName} / ${r.genericName}</td>
        <td>${r.dispensedQuantity}</td>
        <td>${r.pharmacyName}</td>
      </tr>`;
    });

    html += `</tbody></table><br><a href="/prescriptions">Back to Prescriptions</a>`;
    res.send(html);
  } catch (err) {
    next(err);
  }
}

// Show all dispense records
async function showAll(req, res, next) {
  try {
    const records = await DispenseRecord.getAll();

    let html = `<h1>All Dispense Records</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead><tr>
          <th>ID</th><th>Date Dispensed</th><th>Prescription ID</th>
          <th>Medication</th><th>Quantity</th><th>Pharmacy</th>
        </tr></thead><tbody>`;

    records.forEach(r => {
      html += `<tr>
        <td>${r.dispenseID}</td>
        <td>${r.dispenseDate}</td>
        <td>${r.prescriptionID}</td>
        <td>${r.brandName} / ${r.genericName}</td>
        <td>${r.dispensedQuantity}</td>
        <td>${r.pharmacyName}</td>
      </tr>`;
    });

    html += `</tbody></table><br><a href="/dashboard">Back to Dashboard</a>`;
    res.send(html);
  } catch (err) {
    next(err);
  }
}

module.exports = { showByPrescription, showAll };
