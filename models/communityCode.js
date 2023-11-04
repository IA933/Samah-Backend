/**
 * THIS MODEL IS USED TO CREATE JOINING CODE FOR COMMUNITIES
 */

const { Schema, model } = require('mongoose');

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
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true
  }]
}, {
  timestamps: true
})

module.exports = model('CommunityCode', CommunityCode);