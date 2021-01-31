const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/sign-in', usersController.sign_in);
router.get('/sign-up', usersController.sign_up);
router.post('/create', usersController.create);
router.post('/create-session', usersController.create_session);

module.exports = router;
