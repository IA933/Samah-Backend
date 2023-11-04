const {Schema, model, Model} = require('mongoose')

const CommunityModel = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }]
},{
  timestamps: true
})

module.exports = model('Community', CommunityModel)