const { Schema, model } = require('mongoose');

const reportSchema = new Schema({
  reporter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ['UNKNOWN', "ALIVE", "INJURED", "DEAD"],
    default: "ALIVE"
  },
  address: {
    street: { type: String },
    city: { type: String },
  },
  note: {
    type: String,
    maxlength: [2048, 'Note cannot be more than 2048 characters']
  }

})

module.exports = model("Report", reportSchema)