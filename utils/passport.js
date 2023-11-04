
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const User = require("../models/user");
const { validatePassword } = require('./passwordUtils');

passport.use(new LocalStrategy(async (username, password, done) => {
  const resultUser = await User.findOne({
    $or: [{ username: username }, { email: username }]
  });

  if (!resultUser)
    return done(null, false, { message: 'Incorrect username or password.' })

  if (validatePassword(password, resultUser.hash, resultUser.salt)) {
    return done(null, resultUser)
  } else {
    return done(null, false, "InvalidCredentials")
  }
}))

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((userID, done) => {
  User.findById(userID)
  .then(user => done(null, user))
  .catch((err) => done(err))
})