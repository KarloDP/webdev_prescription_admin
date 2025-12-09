/**
 * Doctor view helper
 * Connects controller logic to the EJS template for doctors.
 */

function renderDoctorsPage(res, doctors) {
  res.render('pages/dashboard/doctors', { doctors });
}

function renderPendingDoctorsPage(res, pendingDoctors) {
  res.render('pages/dashboard/doctors', { doctors: pendingDoctors });
}

module.exports = {
  renderDoctorsPage,
  renderPendingDoctorsPage
};
