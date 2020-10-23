const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, required: true },
  accounts: [accountSchema]
}, {
  timestamps: true
})

const User = mongoose.model('user-ids', userSchema);

module.exports = User;