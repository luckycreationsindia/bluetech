const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/register', user_controller.user_register);
router.post('/validate', user_controller.user_validate);
router.get('/profile', user_controller.user_profile);
module.exports = router;