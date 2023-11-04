module.exports = (req, res, next) => {
  const user = req.user;

  delete user.hash;
  delete user.salt;

  res.status(200).json(user);
}