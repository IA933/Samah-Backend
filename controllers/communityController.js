const { v4 } = require("uuid");

const Community = require('../models/community')
const CommunityCode = require('../models/communityCode');
const User = require('../models/user')
const Member = require('../models/member');
const ReqError = require("../utils/ReqError");

const getCommunity = async (req, res, next) => {
  const communities = await Community.find();
  res.status(200).json(communities);
}

const createCommunity = async (req, res, next) => {
  const { name } = req.body


  const community = new Community({
    name: name,
    owner: req.user.id,
    members: [req.user.id]
  })

  const member = await Member.create({
    role: "OWNER",
    user: req.user.id,
    community: community.id
  });

  community.members.push(member)

  await User.findByIdAndUpdate(req.user.id, { $push: { communities: community.id } });

  await community.save();
  return res.status(201).json({ message: 'Successfully created a community' })
}

const deleteCommunity = async (req, res, next) => {
  const { communityID } = req.params;
  // console.log(communityID);

  const community = await Community.findById(communityID);

  if (community.owner != req.user.id)
    return res.sendStatus(401)
  // Delete all the codes associated with this community
  await CommunityCode.deleteMany({ community: communityID });

  //delete all communities in the user object
  await User.updateMany({ communities: { $in: [communityID] } }, { $pull: { community: community.id } })

  //delete owner memeber
  await Member.deleteMany({ community: community.id });

  // Then delete the community itself
  await Community.findByIdAndDelete(communityID);
  return res.status(204).send()
}

const createJoiningCode = async (req, res, next) => {
  const { id } = req.params; // community id

  const communityMembers = await Member.find({ community: id }).populate('user');
  const userMember = communityMembers.find(member => member.user.id === req.user.id);

  if (!userMember || userMember.role === 'MEMBER')
    return res.sendStatus(403)

  let code;
  let codeDoesExist
  do {
    code = v4().replace(/[^a-zA-Z]/g, '').slice(0, 8).toUpperCase();
    codeDoesExist = await CommunityCode.findOne({ code: code });
  } while (codeDoesExist);

  const community = await Community.findById(id)
  if (!community)
    throw ReqError("no community found", 404);

  await CommunityCode.create({
    code: code,
    community: community._id,
    owner: req.user.id
  })

  res.status(201).json({ code: code });
}

const deleteJoiningCode = async (req, res, next) => {
  const { id: code } = req.params; // joining code's code
  const communityCode = await CommunityCode.findOne({ code: code }).populate('community');

  if (!communityCode)
    throw new ReqError("Couldnt find code object", 404);

  // check if the user has the permission to delete the joining code
  const communityMemebers = await Member.find({ community: communityCode.community._id }).populate("user");
  const userMember = communityMemebers.find(member => member.user.id === req.user.id)

  if (userMember.role === "MEMBER")
    return res.sendStatus(403);

  // DELETE THE CODE 
  await communityCode.deleteOne();

  res.sendStatus(200);
}

const joinCommunity = async (req, res, next) => {
  const { code } = req.params;
  const userId = req.user.id;
  const communityCode = await CommunityCode.findOne({ code: code });
  // console.log(communityCode);
  if (!communityCode)
    throw new ReqError('Invalid Join Code', 403);

  await communityCode.populate("community")

  const memberAlreadyInCommunity = await Member.exists({ user: userId, community: communityCode.community._id });

  if (memberAlreadyInCommunity) {
    throw new ReqError('User already in the same community with that code', 409);
  }

  const member = await Member.create({
    user: userId,
    community: communityCode.community
  });

  await User.updateOne({ _id: userId }, { $push: { communities: member._id } });

  res.status(201).json({ message: `Successfully joined ${communityCode.community.name}` })
}

const leaveCommunity = async (req, res, next) => {
  const { communityID } = req.params; // community id
  const userId = req.user.id;

  const memberToRemove = await Member.findOne({ user: userId, community: communityID });


  if (!memberToRemove)
    return res.sendStatus(403)
  await Community.findByIdAndUpdate(memberToRemove.community, {
    $pull: { members: memberToRemove._id }
  })

  await memberToRemove.deleteOne();

  await User.findByIdAndUpdate(userId, { $pull: { communities: memberToRemove.id } });
  res.status(200).json({ message: `Left ${memberToRemove.community.name}` });
}

module.exports = {
  getCommunity,
  createCommunity,
  deleteCommunity,
  createJoiningCode,
  deleteJoiningCode,
  joinCommunity,
  leaveCommunity
}