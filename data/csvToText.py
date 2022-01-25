""" 
Crude solution CORS security rules for JavaScript preventing local file access.
Used for demostration purposes.
"""

import csv

# modify directory depending on OS / IDE
dir = ".\\module\\part c\\main-webpage 1.0\\data\\"
file = open(dir + "delta.csv")
csvreader = csv.reader(file)

# clears output.txt
destination = open(dir + "output.txt", "w")
destination.truncate(0)

# reads the content of the csv and saves into output.txt
header = []
header = next(csvreader)
destination.write("<thead>\n")
destination.write("<tr>\n")
for head in header:
    destination.write("<th>" + head + "</th>\n")
destination.write("</tr>\n")
destination.write("</thead>\n")

destination.write("<tbody>\n")
for row in csvreader:
    destination.write("<tr>\n")
    for element in row:
        destination.write("<td>" + element + "</td>\n")
    destination.write("</tr>")
destination.write("</tbody>\n")