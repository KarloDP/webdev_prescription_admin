const Prescription = require('../models/prescriptionModel');

async function showPrescriptions(req, res, next) {
  try {
    const { name } = req.query;
    const prescriptions = name
      ? await Prescription.searchByName(name)
      : await Prescription.getAll();

    let html = `
      <h1>Prescriptions</h1>
      <form method="GET" action="/prescriptions">
        <input type="text" name="name" placeholder="Search by Patient, Doctor, or Medication" value="${name || ''}">
        <button type="submit">Search</button>
      </form>
      <br>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Medications</th>
            <th>ID</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Issue Date</th>
            <th>Expiration</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
    `;

    prescriptions.forEach(pr => {
      html += `
        <tr>
          <td>${pr.patientName}</td>
          <td>${pr.medications}</td>
          <td>${pr.prescriptionID}</td>
          <td>${pr.doctorName}</td>
          <td>${pr.status}</td>
          <td>${pr.issueDate}</td>
          <td>${pr.expirationDate}</td>
          <td><a href="/prescriptions/${pr.prescriptionID}/history">View</a></td>
        </tr>`;
    });

    html += `
        </tbody>
      </table>
      <br><a href="/dashboard">Back to Dashboard</a>
    `;

    res.send(html);
  } catch (err) {
    next(err);
  }
}

async function showHistory(req, res, next) {
  try {
    const { id } = req.params;
    const history = await Prescription.getDispenseHistory(id);

    let html = `<h1>Dispense History for Prescription #${id}</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead><tr>
          <th>ID</th><th>Date Dispensed</th><th>Medication</th><th>Quantity</th><th>Pharmacy</th>
        </tr></thead><tbody>`;

    history.forEach(h => {
      html += `<tr>
        <td>${h.dispenseID}</td>
        <td>${h.dispenseDate}</td>
        <td>${h.brandName}</td>
        <td>${h.dispensedQuantity}</td>
        <td>${h.pharmacyName}</td>
      </tr>`;
    });

    html += `</tbody></table><br><a href="/prescriptions">Back to Prescriptions</a>`;
    res.send(html);
  } catch (err) {
    next(err);
  }
}

module.exports = { showPrescriptions, showHistory };
