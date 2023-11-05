const axios = require('axios')
const User = require('../models/user')
const Report = require('../models/report')
const ReqError = require('../utils/ReqError')

const editPersonalInfo = async (res, req, next) => {
  const { chronic_dis, other_info, blood_type, } = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, { chronic_dis, other_info, blood_type });

  user.hash = undefined
  user.salt = undefined
  res.status(200).json(user)
}

const registerFaceID = async (req, res, next) => {
  if (req.user.is_faceID_registredD)
    throw new ReqError("You are already Registred", 304);

  const faceID = req.file;
  if (!faceID)
    throw new ReqError("No image selected", 403);

  const isRegistred = (await axios.post(process.env.AI_ENDPOINT, { image: faceID, userID: req.user.id })).data;

  if (!isRegistred)
    throw new ReqError("Failed to register Face ID", 400);

  await User.findByIdAndUpdate(req.user.id, { is_faceID_registred: true });

  res.sendStatus(200);
}

const getUserByfaceID = async (req, res, next) => {
  const faceID = req.file;
  if (!faceID)
    throw new ReqError("No image selected", 403);

  const userID = (await axios.post(process.env.AI_ENDPOINT, { image: faceID })).data

  if (!userID)
    throw new ReqError("No User Found", 200)

  const user = await User.findById(userID);

  user.hash = undefined
  user.salt = undefined
  user.email = undefined
  user.communities = undefined

  return res.status(200).json(user);
}

const ReportUser = async (req, res, next) => {
  const { userID } = req.params;
  const { status, address, note } = req.body;
  const user = await User.findById(userID);

  if (!user)
    throw new ReqError('User not found', 404)

  const report = new Report({
    reporter: req.user.id,
    user: user.id,
    status: status,
    address: address,
    note: note
  })

  await report.save();
  res.sendStatus(200);
}

module.exports = { editPersonalInfo, registerFaceID, getUserByfaceID, ReportUser }