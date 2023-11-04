const ReqError = require('../utils/ReqError')
const { Router } = require('express');

const communityRouter = Router();

const controller = require('../controllers/communityController')
const functionCapsule = require('../utils/functionCapsule')



/**
 * creat                  post /create
 * delete community       delete /:communityID
 * create joining code    post /link/:communityID
 * delete a joining code  delete /link/:linkID
 * join community         post /join/:code
 * leave community        delete /leave/:communityID
 */
communityRouter.use((req, res, next) => {
  if (!req.user) {
    throw new ReqError("authentification required", 511);
  }
  else
    next()
})

communityRouter.route('/')
  // get communities
  .get(functionCapsule(controller.getCommunity))
  // create a community
  .post(functionCapsule(controller.createCommunity))

communityRouter.route('/:communityID')
  // delete a community
  .delete(functionCapsule(controller.deleteCommunity))

communityRouter.route('/code/:id')
  // create a code
  .post(functionCapsule(controller.createJoiningCode))
  // delete a code params: id (code)
  .delete(functionCapsule(controller.deleteJoiningCode))


communityRouter.route('/join/:code')
  // join a community
  .post(functionCapsule(controller.joinCommunity))

communityRouter.route("/leave/:communityID")
  // leave a community
  .post(functionCapsule(controller.leaveCommunity))


module.exports = communityRouter