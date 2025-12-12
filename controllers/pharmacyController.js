const Pharmacy = require('../models/pharmacyModel');

async function showPharmacies(req, res, next) {
  try {
    const pharmacies = await Pharmacy.getAll();

    let html = `
      <h1>Pharmacies</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;

    pharmacies.forEach(ph => {
      html += `
        <tr>
          <td>${ph.pharmacyID}</td>
          <td>${ph.name}</td>
          <td>${ph.email}</td>
          <td>${ph.status}</td>
          <td>
            ${ph.status === 'pending' ? `
              <form method="POST" action="/pharmacies/approve" style="display:inline;">
                <input type="hidden" name="pharmacyID" value="${ph.pharmacyID}">
                <button type="submit">Approve</button>
              </form>
              <form method="POST" action="/pharmacies/deny" style="display:inline;">
                <input type="hidden" name="pharmacyID" value="${ph.pharmacyID}">
                <button type="submit">Deny</button>
              </form>
            ` : ph.status === 'active' ? `
              <form method="POST" action="/pharmacies/deactivate" style="display:inline;">
                <input type="hidden" name="pharmacyID" value="${ph.pharmacyID}">
                <button type="submit">Deactivate</button>
              </form>
            ` : ph.status === 'inactive' ? `
              <form method="POST" action="/pharmacies/activate" style="display:inline;">
                <input type="hidden" name="pharmacyID" value="${ph.pharmacyID}">
                <button type="submit">Activate</button>
              </form>
              <form method="POST" action="/pharmacies/delete" style="display:inline;">
                <input type="hidden" name="pharmacyID" value="${ph.pharmacyID}">
                <button type="submit">Delete</button>
              </form>
            ` : ''}
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
        <input type="text" name="password" placeholder="Password" required><br>
        <input type="text" name="address" placeholder="Address" required><br>
        <input type="text" name="contactNumber" placeholder="Contact Number" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="text" name="clinicAddress" placeholder="Clinic Address" required><br>
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
    const { name, password, address, contactNumber, email, clinicAddress } = req.body;
    await Pharmacy.addPharmacy({ name, password, address, contactNumber, email, clinicAddress });
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Add Error:', err);
    next(err);
  }
}

async function approvePharmacy(req, res, next) {
  try {
    const { pharmacyID } = req.body;
    await Pharmacy.approve(pharmacyID);
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Approve Error:', err);
    next(err);
  }
}

async function denyPharmacy(req, res, next) {
  try {
    const { pharmacyID } = req.body;
    await Pharmacy.deny(pharmacyID);
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Deny Error:', err);
    next(err);
  }
}

async function deactivatePharmacy(req, res, next) {
  try {
    const { pharmacyID } = req.body;
    await Pharmacy.deactivate(pharmacyID);
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Deactivate Error:', err);
    next(err);
  }
}

async function activatePharmacy(req, res, next) {
  try {
    const { pharmacyID } = req.body;
    await Pharmacy.activate(pharmacyID);
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Activate Error:', err);
    next(err);
  }
}

async function deletePharmacy(req, res, next) {
  try {
    const { pharmacyID } = req.body;
    await Pharmacy.delete(pharmacyID);
    res.redirect('/pharmacies');
  } catch (err) {
    console.error('Pharmacy Delete Error:', err);
    next(err);
  }
}

module.exports = {
  showPharmacies,
  addPharmacy,
  approvePharmacy,
  denyPharmacy,
  deactivatePharmacy,
  activatePharmacy,
  deletePharmacy
};
