const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  merchant_code: {
    type: String,
    required: true,
  },
  amount_cents: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('transaction', TransactionSchema);
