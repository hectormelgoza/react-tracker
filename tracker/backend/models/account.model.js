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

const Account = mongoose.model('account', accountSchema);

module.exports = Account;