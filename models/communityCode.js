/**
 * THIS MODEL IS USED TO CREATE JOINING CODE FOR COMMUNITIES
 */

const { Schema, module } = require('mongoose');

const CommunityCode = new Schema({
  community: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('CommunityCode', CommunityCode);