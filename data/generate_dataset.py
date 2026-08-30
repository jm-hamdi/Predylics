import csv
import random
from datetime import date, timedelta

CUSTOMERS = [
    "Acme Corp", "Globex", "Initech", "Umbrella Ltd", "Stark Industries",
    "Wayne Enterprises", "Hooli", "Pied Piper", "Dunder Mifflin", "Cyberdyne"
]

CATEGORIES = {
    "Software": [
        ("Analytics Pro", 1500),
        ("CRM Suite", 1200),
        ("ERP System", 3000),
    ],
    "Cloud": [
        ("Cloud Storage", 200),
        ("Cloud Compute", 500),
        ("CDN Service", 150),
    ],
    "AI": [
        ("AI Assistant", 750),
        ("ML Pipeline", 2000),
        ("Vision API", 900),
    ],
    "Hardware": [
        ("Server Rack", 4000),
        ("Network Switch", 800),
        ("Workstation", 1800),
    ],
    "Services": [
        ("Consulting Day", 1000),
        ("Support Pack", 300),
        ("Training Session", 500),
    ],
}

COUNTRIES = ["France", "Germany", "Spain", "UK", "USA", "Morocco"]

START_DATE = date(2026, 1, 1)
END_DATE = date(2026, 6, 30)


def random_date(start, end):
    delta = (end - start).days
    return start + timedelta(days=random.randint(0, delta))


def generate(n=200, output="data/sales_data.csv"):
    rows = []
    for i in range(1, n + 1):
        category = random.choice(list(CATEGORIES.keys()))
        product, unit_price = random.choice(CATEGORIES[category])
        unit_price = int(unit_price * random.uniform(0.9, 1.1))
        rows.append({
            "id": i,
            "date": random_date(START_DATE, END_DATE).isoformat(),
            "customer": random.choice(CUSTOMERS),
            "category": category,
            "product": product,
            "quantity": random.randint(1, 20),
            "unit_price": unit_price,
            "country": random.choice(COUNTRIES),
        })

    with open(output, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    print(f"Generated {n} rows → {output}")


if __name__ == "__main__":
    generate()
