const { Router } = require('express')
const passport = require('passport')

const functionCapsule = require('../utils/functionCapsule');

const Register = require('../controllers/authentification/register')
const Login = require('../controllers/authentification/login')

const AuthRouter = Router();

AuthRouter.post('/register', functionCapsule(Register));

AuthRouter.post('/login', passport.authenticate('local'), functionCapsule(Login))

module.exports = AuthRouter
