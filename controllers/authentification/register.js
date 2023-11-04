const User = require('../../models/user')
const {genPassword} = require('../../utils/passwordUtils')


module.exports = async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    age,
    phone_number,
    email,
    status,
    password
  } = req.body

  console.log(req.body);
  const {salt, hash} = genPassword(password, username)

  const newUser = new User({
     username: username,
     firstname: firstname,
     lastname: lastname,
     age: age,
     phone_number: phone_number,
     email: email,
     salt: salt,
     hash: hash,
     status: status
  });

  newUser.save()
  .then(() => res.sendStatus(200))
  .catch(err => {
    console.log(err)
    // throw ReqError()
    res.sendStatus(500)
  })
}