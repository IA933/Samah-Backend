const { Schema, model } = require('mongoose')

const UserModel = new Schema({
  username: {
    type: String,
    unique: true, 
    required: true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
  },
  phone_number: {
    type: String,
    required: false
  },
  email: {
    type: String,
    unique: true,
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  face_id: {
    type: String,
    required: false
  },
  thumb: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['UNKNOWN', "ALIVE", "INJURED", "DEAD"],
    default: "ALIVE"
  }
}, {
  timestamps: true
})

module.exports = model("User", UserModel);