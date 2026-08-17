"""Print the secret message encoded in a published Google Doc.

The document has a table of characters and their x/y positions in a grid.
Printing the grid in a fixed-width font spells out the message.
"""

import sys
import urllib.request
from html.parser import HTMLParser


class TableParser(HTMLParser):
    """Pulls the text out of every table cell, grouped by row."""

    def __init__(self):
        super().__init__()
        self.rows = []
        self.row = []
        self.cell = None

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self.row = []
        elif tag in ("td", "th"):
            self.cell = []

    def handle_endtag(self, tag):
        if tag in ("td", "th") and self.cell is not None:
            self.row.append("".join(self.cell).strip())
            self.cell = None
        elif tag == "tr" and self.row:
            self.rows.append(self.row)

    def handle_data(self, data):
        if self.cell is not None:
            self.cell.append(data)


def get_table_rows(url):
    """Download the document and return its table as a list of rows."""
    with urllib.request.urlopen(url) as response:
        html = response.read().decode("utf-8")

    parser = TableParser()
    parser.feed(html)
    return parser.rows


def print_secret_message(url):
    """Fetch the Google Doc at the given URL and print the grid it describes."""
    characters = {}
    for row in get_table_rows(url):
        if len(row) != 3:
            continue
        try:
            x, y = int(row[0]), int(row[2])
        except ValueError:
            continue  # the header row
        characters[(x, y)] = row[1]

    if not characters:
        print("No character data found in", url)
        return

    width = max(x for x, y in characters) + 1
    height = max(y for x, y in characters) + 1

    # y is measured upwards from the bottom, so the top row is printed first.
    for y in range(height - 1, -1, -1):
        print("".join(characters.get((x, y), " ") for x in range(width)))


if __name__ == "__main__":
    # Windows defaults to cp1252, which cannot encode the block characters.
    sys.stdout.reconfigure(encoding="utf-8")
    print_secret_message(sys.argv[1])
