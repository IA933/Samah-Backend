const { Router } = require('express');
const passport = require('passport');

const functionCapsule = require('../utils/functionCapsule');
const authentificationController = require('../controllers/authentificationController');

const AuthRouter = Router();

AuthRouter.post('/register', functionCapsule(authentificationController.Register));
AuthRouter.post('/login', passport.authenticate('local'), functionCapsule(authentificationController.Login));

module.exports = AuthRouter
