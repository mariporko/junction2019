import csv
import json
from datetime import date

# Read data files skipping the metadata rows

with open('SMT8-12_hourly.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=';')
    counter = 0
    hourly_data = {}
    hourly_data['electricity'] = {}
    hourly_data['heating'] = {}
    hourly_data['water'] = {}
    for row in readCSV:
        if counter < 52:
            counter += 1
            continue
        else:
            pass
            #print(row[0], row[1], row[2],)


with open('SMT8-12_weekly.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=';')
    weekly_data = {}
    weekly_data['electricity'] = {}
    weekly_data['heating'] = {}
    weekly_data['water'] = {}
    
    counter = 0

    for row in readCSV:
        if counter < 52:
            counter += 1
            continue
        else:
            #if row[0] < "52":
            #    key = int(row[0])
            #else:
            #    key = row[0]
            if row[3]:
                weekly_data['electricity'][row[0]] = int(row[3].replace(" ",""))
            else:
                weekly_data['electricity'][row[0]] = None

            if row[9]:
                weekly_data['heating'][row[0]] = float(row[9].replace(",",".").replace(" ",""))
            else:
                weekly_data['heating'][row[0]] = None
            
            if row[15]:
                weekly_data['water'][row[0]] = float(row[15].replace(",",".").replace(" ",""))
            else:
                weekly_data['water'][row[0]] = None

    #print(json.dumps(weekly_data, sort_keys=True, indent=4))
            

with open('SMT8-12_monthly.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=';')
    counter = 0
    for row in readCSV:
        if counter < 52:
            counter += 1
            continue
        else:
            pass
            #print(row[0], row[1], row[2],)

    


