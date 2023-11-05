const User = require('../models/user')
const { genPassword } = require('../utils/passwordUtils')

const Register = async (req, res) => {
  // console.log(req.body);

  const {
    username,
    firstname,
    lastname,
    dob,
    phone_number,
    email,
    status,
    password,
    blood
  } = req.body

  const { salt, hash } = genPassword(password, username)

  const newUser = new User({
    username: username,
    firstname: firstname,
    lastname: lastname,
    dob: dob,
    blood: blood,
    phone_number: phone_number,
    email: email,
    salt: salt,
    hash: hash,
    status: status
  });
  
  await newUser.save()
  await res.sendStatus(200)
}

const Login = async (req, res, next) => {
  const user = req.user;
  user.hash = undefined
  user.salt = undefined
  res.status(200).json(user);
}

module.exports = {Login, Register}