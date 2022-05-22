# define the 7 rules
def apply_rule_1 (dict, result):
    while ('sportchek' in dict and
    dict['sportchek'] >= 7500 and
    'tim_hortons' in dict and
    dict['tim_hortons'] >= 2500 and
    'subway' in dict and
    dict['subway'] >= 2500):
        result['points'] += 500
        result['rules']['rule 1'] =result['rules']['rule 1'] + 1 if  'rule 1' in result['rules'] else 1
        dict['sportchek'] -= 7500
        dict['tim_hortons'] -= 2500
        dict['subway'] -= 2500

def apply_rule_2 (dict, result):
    while ('sportchek' in dict and
    dict['sportchek'] >= 7500 and
    'tim_hortons' in dict and
    dict['tim_hortons'] >= 2500):
        result['points'] += 300
        result['rules']['rule 2'] = result['rules']['rule 2'] + 1 if 'rule 2' in result['rules'] else 1
        dict['sportchek'] -= 7500
        dict['tim_hortons'] -= 2500

def apply_rule_3 (dict, result):
    while ('sportchek' in dict and
    dict['sportchek'] >= 7500):
        result['points'] += 200
        result['rules']['rule 3'] = result['rules']['rule 3'] + 1 if 'rule 3' in result['rules'] else 1
        dict['sportchek'] -= 7500

def apply_rule_4 (dict, result):
    while ('sportchek' in dict and
    dict['sportchek'] >= 2500 and
    'tim_hortons' in dict and
    dict['tim_hortons'] >= 1000 and
    'subway' in dict and
    dict['subway'] >= 1000):
        result['points'] += 150
        result['rules']['rule 4'] = result['rules']['rule 4'] + 1 if  'rule 4' in result['rules'] else 1
        dict['sportchek'] -= 2500
        dict['tim_hortons'] -= 1000
        dict['subway'] -= 1000

def apply_rule_5 (dict, result):
    while ('sportchek' in dict and
    dict['sportchek'] >= 2500 and
    'tim_hortons' in dict and
    dict['tim_hortons'] >= 1000):
        result['points'] += 75
        result['rules']['rule 5'] = result['rules']['rule 5'] + 1 if  'rule 5' in result['rules'] else 1
        dict['sportchek'] -= 2500
        dict['tim_hortons'] -= 1000

def apply_rule_6 (dict, result):
    while ('sportchek' in dict and
    dict['sportchek'] >= 2000):
        result['points'] += 75
        result['rules']['rule 6'] = result['rules']['rule 6'] + 1 if  'rule 6' in result['rules'] else 1
        dict['sportchek'] -= 2000

def apply_rule_7 (dict, result):
    for key in dict:
        count = dict[key] // 100
        if count != 0:
            result['points'] += count
            result['rules']['rule 7'] =result['rules']['rule 7'] + count if 'rule 7' in result['rules'] else count
            dict[key] -= count * 100
