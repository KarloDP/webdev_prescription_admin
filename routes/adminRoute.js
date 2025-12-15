const express = require('express');
const router = express.Router();


const {
	showAdmins,
	showPendingAdmins,
	addPendingAdmin,
	acceptAdmin,
	deleteAdmin
} = require('../controllers/adminController');

router.get('/admins', showAdmins);


router.post('/admins/accept', acceptAdmin);

router.post('/admins/delete', deleteAdmin);

module.exports = router;
