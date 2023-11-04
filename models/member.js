const { Schema, model } = require('mongoose')

const memberSchema = new Schema({
   role: {
    type: String,
    enum: ["OWNER", "MODERATOR", "MEMBER"],
    default: "MEMBER",
   },
   user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
   },
   community: {
    type: Schema.Types.ObjectId,
    ref: 'Community',
    required: true
   }
},{
  timestamps: true
})

module.exports = model("Member", memberSchema)