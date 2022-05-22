import copy
import itertools
from rules import *
from transactions_input import transactions

# count total cents spent at each merchant
total_result = { "points": 0, "rules": {} }
report_dict = {}
for report in transactions:
    merchant_code = report['merchant_code']
    report_dict[merchant_code] = report_dict[merchant_code] + report['amount_cents'] if merchant_code in report_dict else report['amount_cents']


dictionary = { 1: apply_rule_1, 2: apply_rule_2, 3: apply_rule_3, 4: apply_rule_4, 5: apply_rule_5, 6: apply_rule_6, 7: apply_rule_7 }
l = list(itertools.permutations([1, 2, 3,4,5,6,7]))

cur_best_points = -1
cur_best_result = {}
cur_order = []
for order in l:
    # print (order)
    tmp_dict = dict(report_dict)
    tmp_total_result = copy.deepcopy(total_result)
    dictionary[order[0]](tmp_dict, tmp_total_result)
    dictionary[order[1]](tmp_dict, tmp_total_result)
    dictionary[order[2]](tmp_dict, tmp_total_result)
    dictionary[order[3]](tmp_dict, tmp_total_result)
    dictionary[order[4]](tmp_dict, tmp_total_result)
    dictionary[order[5]](tmp_dict, tmp_total_result)
    dictionary[order[6]](tmp_dict, tmp_total_result)
    if tmp_total_result["points"] > cur_best_points:
        cur_best_points = tmp_total_result["points"]
        cur_best_result = tmp_total_result
        cur_order = order

print ("Total points:", cur_best_result["points"])
print ("Order of rules applied:", cur_order)
print ("Rules applied:")
for key in cur_best_result["rules"]:
    print (f'- {key} * {cur_best_result["rules"][key]}')
