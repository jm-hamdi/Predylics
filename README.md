# Predylics — Data Assistant

A mini smart data analysis app built for the Predylics technical test.

Import a CSV dataset, explore it through a clean interface, and query it using AI in natural language.

---

## Architecture

```
predylics/
├── data/         → dataset generator + sales_data.csv
├── backend/      → FastAPI REST API + AI assistant (Python)
└── frontend/     → React + Vite dashboard (Tailwind + Recharts)
```

---

## Tech Stack

| Layer    | Choice                  |
|----------|-------------------------|
| Frontend | React + Vite + Tailwind |
| Charts   | Recharts                |
| Backend  | Python + FastAPI        |
| Data     | pandas                  |
| AI       | Groq API + Llama 3      |
| Deploy   | Docker + docker-compose |

---

## Getting Started

> Full setup instructions coming soon (README updated per task).

---

## API Endpoints

| Method | Path     | Description                        |
|--------|----------|------------------------------------|
| GET    | /health  | Health check                       |
| GET    | /data    | List rows with optional filters    |
| GET    | /stats   | Aggregated KPIs                    |
| POST   | /ask     | AI natural language query          |

---

## Dataset

The dataset is a fictional B2B sales CSV with 200 rows:

```
id, date, customer, category, product, quantity, unit_price, country
```

Run `python data/generate_dataset.py` to regenerate it.

---

*Predylics Technical Test — Software Engineer AI — Jawad Mhamdi*
