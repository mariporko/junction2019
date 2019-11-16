import csv

# Read data files skipping the metadata rows

with open('SMT8-12_hourly.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=';')
    counter = 0
    for row in readCSV:
        if counter < 52:
            counter += 1
            continue
        else:
            print(row[0], row[1], row[2],)

with open('SMT8-12_weekly.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=';')
    counter = 0
    for row in readCSV:
        if counter < 52:
            counter += 1
            continue
        else:
            print(row[0], row[1], row[2],)

with open('SMT8-12_monthly.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=';')
    counter = 0
    for row in readCSV:
        if counter < 52:
            counter += 1
            continue
        else:
            print(row[0], row[1], row[2],)
