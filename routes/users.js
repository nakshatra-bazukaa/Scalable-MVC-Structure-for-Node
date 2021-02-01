const express = require('express');
const passport = require('passport');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/sign-in', usersController.sign_in);
router.get('/sign-up', usersController.sign_up);
router.post('/create', usersController.create);
// using passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.create_session);
router.get('/sign-out', usersController.destroySession);

module.exports = router;
