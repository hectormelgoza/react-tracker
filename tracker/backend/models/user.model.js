const mongoose = require('mongoose');
let Account = require('./account.model');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, required: true },
  accounts: [Account]
}, {
  timestamps: true
})

const User = mongoose.model('user-ids', userSchema);

module.exports = User;