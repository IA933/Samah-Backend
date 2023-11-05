const multer = require('multer');
const path = require('path')
const fs = require('fs')

const ReqError = require('../utils/ReqError')

module.exports = (inputField) => {

  const Storage = multer.memoryStorage();

  const uploadPic = multer({ storage: Storage });

  const uploadImage = (req, res, next) => {
    // If conditions are met, proceed with file upload using Multer
    uploadPic.single(inputField)(req, res, err => {
      if (err)
        next(new ReqError(err.message, 400));

      next(); // No error, continue with the next middleware/route handler
    });

  };

  return uploadImage;
}