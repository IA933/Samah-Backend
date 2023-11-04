module.exports = async (req, res, next) => {
  const user = req.user;
  user.hash = undefined
  user.salt = undefined
  res.status(200).json(user);
}