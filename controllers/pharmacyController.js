const Pharmacy = require('../models/pharmacyModel');

async function showPharmacies(req, res, next) {
  try {
    const pharmacies = await Pharmacy.getAll();

    let html = `
      <h1>Pharmacies</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Address</th><th>Contact</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;

    pharmacies.forEach(ph => {
      html += `
        <tr>
          <td>${ph.pharmacyID}</td>
          <td>${ph.name}</td>
          <td>${ph.address}</td>
          <td>${ph.contactNumber}</td>
          <td>${ph.status}</td>
          <td>
            ${ph.status === 'active' ? `
              <form method="POST" action="/pharmacies/deactivate" style="display:inline;">
                <input type="hidden" name="pharmacyID" value="${ph.pharmacyID}">
                <button type="submit">Deactivate</button>
              </form>
            ` : ''}
            <form method="POST" action="/pharmacies/delete" style="display:inline;">
              <input type="hidden" name="pharmacyID" value="${ph.pharmacyID}">
              <button type="submit">Delete</button>
            </form>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>

      <h2>Add New Pharmacy</h2>
      <form method="POST" action="/pharmacies/add">
        <input type="text" name="name" placeholder="Pharmacy Name" required><br>
        <input type="text" name="address" placeholder="Address" required><br>
        <input type="text" name="contactNumber" placeholder="Contact Number" required><br>
        <button type="submit">Add Pharmacy</button>
      </form>

      <br><a href="/dashboard">Back to Dashboard</a>
    `;

    res.send(html);
  } catch (err) {
    console.error('Pharmacy Error:', err);
    next(err);
  }
}

async function addPharmacy(req, res, next) {
  try {
    const { name, address, contactNumber } = req.body;
    await Pharmacy.addPharmacy({ name, address, contactNumber });
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Add Error:', err);
    next(err);
  }
}

async function deactivatePharmacy(req, res, next) {
  try {
    const { pharmacyID } = req.body;
    await Pharmacy.deactivatePharmacy(pharmacyID);
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Deactivate Error:', err);
    next(err);
  }
}

async function deletePharmacy(req, res, next) {
  try {
    const { pharmacyID } = req.body;
    await Pharmacy.deletePharmacy(pharmacyID);
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Delete Error:', err);
    next(err);
  }
}

module.exports = {
  showPharmacies,
  addPharmacy,
  deactivatePharmacy,
  deletePharmacy
};
