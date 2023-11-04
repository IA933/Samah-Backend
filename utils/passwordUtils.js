const crypto = require("crypto");


const genSalt = () => crypto.randomBytes(32).toString('hex');
const genHash = (password, salt) => crypto.pbkdf2Sync(password, salt, 30000, 32, 'sha512').toString('hex')

// crypto.pbkdf2Sync()
const validatePassword = (password, hash, salt) => {
  const newHash = genHash(password, salt)
  return hash === newHash;
}

const genPassword = (password) => {
  const salt = genSalt();
  const hash = genHash(password, salt);
  return {
    salt,
    hash
  }
}

module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;