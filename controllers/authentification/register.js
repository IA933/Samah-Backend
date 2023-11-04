const User = require('../../models/user')
const { genPassword } = require('../../utils/passwordUtils')


module.exports = async (req, res) => {
  // console.log(req.body);

  const {
    username,
    firstname,
    lastname,
    age,
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
    age: age,
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