const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

const apply_rule_1 = (dict, result) => {
  while (
    'sportchek' in dict &&
    dict['sportchek'] >= 7500 &&
    'tim_hortons' in dict &&
    dict['tim_hortons'] >= 2500 &&
    'subway' in dict &&
    dict['subway'] >= 2500
  ) {
    result['points'] += 500;
    result['rules']['rule 1'] =
      'rule 1' in result['rules'] ? result['rules']['rule 1'] + 1 : 1;
    dict['sportchek'] -= 7500;
    dict['tim_hortons'] -= 2500;
    dict['subway'] -= 2500;
  }
};

const apply_rule_2 = (dict, result) => {
  while (
    'sportchek' in dict &&
    dict['sportchek'] >= 7500 &&
    'tim_hortons' in dict &&
    dict['tim_hortons'] >= 2500
  ) {
    result['points'] += 300;
    result['rules']['rule 2'] =
      'rule 2' in result['rules'] ? result['rules']['rule 2'] + 1 : 1;
    dict['sportchek'] -= 7500;
    dict['tim_hortons'] -= 2500;
  }
};

const apply_rule_4 = (dict, result) => {
  while (
    'sportchek' in dict &&
    dict['sportchek'] >= 2500 &&
    'tim_hortons' in dict &&
    dict['tim_hortons'] >= 1000 &&
    'subway' in dict &&
    dict['subway'] >= 1000
  ) {
    result['points'] += 150;
    result['rules']['rule 4'] =
      'rule 4' in result['rules'] ? result['rules']['rule 4'] + 1 : 1;
    dict['sportchek'] -= 2500;
    dict['tim_hortons'] -= 1000;
    dict['subway'] -= 1000;
  }
};

const apply_rule_6 = (dict, result) => {
  while ('sportchek' in dict && dict['sportchek'] >= 2000) {
    result['points'] += 75;
    result['rules']['rule 6'] =
      'rule 6' in result['rules'] ? result['rules']['rule 6'] + 1 : 1;
    dict['sportchek'] -= 2000;
  }
  return { dict, result };
};

const apply_rule_7 = (dict, result) => {
  for (const key in dict) {
    const count = Math.floor(dict[key] / 100);
    if (count) {
      result['points'] += count;
      result['rules']['rule 7'] =
        'rule 7' in result['rules'] ? result['rules']['rule 7'] + count : count;
    }
  }
};

// @route       POST /api/report/
// @desc        Get a report based on given transaction records
// @access      Public
router.post('/', async (req, res) => {
  // generate reward "points" based on the following rules:
  // - Rule 1: 500 "points" for every $75 spend at Sport Chek, $25 spend at Tim Hortons and $25 spend at "Subway"
  // - Rule 2: 300 "points" for every $75 spend at Sport Chek and $25 spend at Tim Hortons
  // - Rule 3: 200 "points" for every $75 spend at Sport Chek
  // - Rule 4: 150 "points" for every $25 spend at Sport Chek, $10 spend at Tim Hortons and $10 spend at "Subway"
  // - Rule 5: 75 "points" for every $25 spend at Sport Chek and $10 spend at Tim Hortons
  // - Rule 6: 75 "points" for every $20 spend at Sport Chek
  // - Rule 7: 1 point for every $1 spend for all other purchases (including leover amount)

  try {
    console.log(req);
    const transactions = req.body;
    // ==================================================================
    // ============= Step 1 - calculate total reward points =============
    // ==================================================================
    // The following two rules are never applied:
    // - Rule 5, since it is strictly worse than rule 3
    // - Rule 3, since it is strictly worse than rule 6

    // There are two possible combinations of rule priorities:
    // - First  combination: 1 => 2 => 4 => 6 => 7
    // - Second combination: 1 => 4 => 2 => 6 => 7

    var total_result = { points: 0, rules: {} };
    var dict = {};
    transactions.map((report) => {
      const merchant_code = report['merchant_code'];
      dict[merchant_code] =
        merchant_code in dict
          ? dict[merchant_code] + report['amount_cents']
          : report['amount_cents'];
    });

    // make duplication of dict, rules, and points
    var dict_2 = JSON.parse(JSON.stringify(dict));
    var total_result_2 = JSON.parse(JSON.stringify(total_result));

    // try first combination
    apply_rule_1(dict, total_result);
    apply_rule_2(dict, total_result);
    apply_rule_4(dict, total_result);
    apply_rule_6(dict, total_result);
    apply_rule_7(dict, total_result);

    // try second combination
    apply_rule_1(dict_2, total_result_2);
    apply_rule_4(dict_2, total_result_2);
    apply_rule_2(dict_2, total_result_2);
    apply_rule_6(dict_2, total_result_2);
    apply_rule_7(dict_2, total_result_2);

    // compare two combinations and return the optimal combination.
    if (total_result_2['points'] > total_result['points']) {
      total_result['points'] = total_result_2['points'];
      total_result[rules] = total_result_2[rules];
    }

    // ==================================================================
    // ========== Step 2 - calculate per transaction points =============
    // ==================================================================
    var per_transaction_results = [];
    transactions.map((report, index) => {
      // parse current transaction record
      var dict = {};
      dict[report['merchant_code']] = report['amount_cents'];
      var result = { points: 0, rules: {} };

      // apply rule 6 and 7
      apply_rule_6(dict, result);
      apply_rule_7(dict, result);

      // add result to per_transaction_results
      const { points, rules } = result;
      per_transaction_results.push({
        index,
        points,
        rules,
      });
    });

    return res.json({ total_result, per_transaction_results });
  } catch (error) {
    console.log(error);
    res.status(500, 'Server error');
  }
});

module.exports = router;
