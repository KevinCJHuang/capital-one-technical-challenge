const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Transaction = require('../models/Transaction');

// @route       GET /api/transation/
// @desc        Get all transactions
// @access      Public
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions);
  } catch (error) {
    res.status(500).send('Server error', error.message());
  }
});

// @route       POST /api/transation/
// @desc        Add an transaction record
// @access      Public
router.post(
  '/',
  [
    [
      check('merchant_code', 'merchant_code is required.').not().isEmpty(),
      check('amount_cents', 'amount_cents is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { merchant_code, amount_cents } = req.body;
    try {
      const newTransaction = new Transaction({
        merchant_code,
        amount_cents,
      });
      Transaction.create(newTransaction);

      return res.json(newTransaction);
    } catch (error) {
      res.status(500).send('Server error', error.message());
    }
  }
);

// @route       PUT /api/transation/:id
// @desc        Edit an transation with id
// @access      Public
router.put('/:id', async (req, res) => {
  const { merchant_code, amount_cents } = req.body;
  const TransactionFields = {};
  if (merchant_code) TransactionFields.merchant_code = merchant_code;
  if (amount_cents) TransactionFields.amount_cents = amount_cents;

  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction)
      return res.status(404).json({ msg: 'Transaction not found.' });

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        $set: TransactionFields,
      },
      { new: true }
    );

    return res.json(transaction);
  } catch (error) {
    res.status(500).send('Server error', error.message());
  }
});

// @route       DELETE /api/transation/:id
// @desc        Delete an transation record
// @access      Public
router.delete('/:id', async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction)
      return res.status(404).json({ msg: 'Transaction not found.' });

    await Transaction.findByIdAndRemove(req.params.id);

    return res.json({ msg: 'Transaction deleted' });
  } catch (error) {
    res.status(500).send('Server error', error.message());
  }
});

module.exports = router;
