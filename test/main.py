import argparse
import copy
import itertools
from rules import *
import json
import requests

# use brute force algorithm to solve for the answer
def solve(transactions):
  # count total cents spent at each merchant, and store into the dictionary
  total_result = { "points": 0, "rules": {} }
  report_dict = {}
  for report in transactions:
    merchant_code = report['merchant_code']
    report_dict[merchant_code] = report_dict[merchant_code] + report['amount_cents'] if merchant_code in report_dict else report['amount_cents']

  # create permutation of all 7 rules
  dictionary = { 1: apply_rule_1, 2: apply_rule_2, 3: apply_rule_3, 4: apply_rule_4, 5: apply_rule_5, 6: apply_rule_6, 7: apply_rule_7 }
  l = list(itertools.permutations([1,2,3,4,5,6,7]))

  # traverse through all permutations and find the best rule
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

  return cur_best_result

# compare both results
def compare(test_case, brute_force_result, api_result):
  print ("Test Case:", test_case, "=================================================================")
  test_result = True
  if (brute_force_result["points"] != api_result["points"]):
    test_result = False
    print ("Failed Test!")
  else:
    print ("Passed Test!")
  print ("=> API result:", api_result)
  print ("=> Answer    :", brute_force_result)
  print ()
  return test_result

# get the reward points from both brute force algorithm and backend API
def get_results(transactions):
  # brute force the answer
  brute_force_result = solve(transactions)

  # use backend API
  response = requests.post(
    "http://localhost:5001/api/report",
    json=transactions,
    headers={'content-type':'application/json'},
  )
  api_result = response.json()["best_total_result"]
  
  # return both results for further comparison
  return brute_force_result, api_result

def main():
  print ("Running tests within test_cases.txt")
  print ("...")
  
  with open("test_cases/test_cases.txt", "r") as f:
    test_cases = f.read().splitlines()

  for test_case in test_cases:
    # read transaction inputs
    with open("test_cases/"+test_case) as f:
      transactions = json.load(f)
    
    # get results and compare results
    brute_force_result, api_result = get_results(transactions)
    test_result = compare(test_case, brute_force_result, api_result)

    if (not test_result):
      return 0

  print ("...")
  print ("All tests passed. Congratulations!")

main()
