
const functionCapsule = (Controller) => async (req, res, next) => {
  try {
    await Controller(req, res, next);
  } catch (err) {
    next(err);
  }
}

module.exports = functionCapsule;