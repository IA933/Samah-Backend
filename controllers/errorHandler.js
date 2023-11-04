module.exports = (err, req, res, next) => {
  console.log(err.code);
  if (err.code === 11000)
    return res.status(406).json({ message: "username already exist" })

  if(!err.cod || typeof err.code !== "number")
    err.code = 500

  return res.status(err.code).json(err.message)
}