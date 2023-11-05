const ReqError = require('../utils/ReqError')
const { Router } = require('express');

const functionCapsule = require('../utils/functionCapsule');
const storeImage = require('../utils/storeImage');

const ClientController = require('../controllers/clientController');

const ClientRouter = Router();

// check if user session is valid
ClientRouter.use(functionCapsule((req, res, next) => {
  if (!req.user)
    throw new ReqError("authentification required", 511);
  else
    next()
}));

// put the health states
ClientRouter.route('/')
  .put(functionCapsule(ClientController.editPersonalInfo));


ClientRouter.route('/faceID')
  //Register face ID
  .post(storeImage("Face"), functionCapsule(ClientController.registerFaceID))
  //    //get UserByID
  .put(storeImage("Face"), functionCapsule(ClientController.getUserByfaceID))

ClientRouter.route('/report/:userID')
  .put(functionCapsule(ClientController.ReportUser))


module.exports = ClientRouter;