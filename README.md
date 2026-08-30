# Predylics - Data Assistant

A mini smart data analysis application built as part of the Predylics technical test.

Import a CSV sales dataset, explore it through a clean dashboard, and query it using AI in natural language.

---

## Architecture

```
predylics/
├── data/         → dataset generator + sales_data.csv
├── backend/      → FastAPI REST API + AI assistant (Python)
└── frontend/     → React + Vite dashboard (Tailwind + Recharts)
```

```
React Dashboard
      ↓  HTTP
FastAPI Backend (/data  /stats  /ask)
      ↓
pandas (CSV processing)    Groq API (AI)
```

---

## Tech Stack

| Layer    | Choice                        |
|----------|-------------------------------|
| Frontend | React 19 + Vite + Tailwind CSS |
| Charts   | Recharts                      |
| Backend  | Python + FastAPI              |
| Data     | pandas                        |
| AI       | Groq API + Llama (openai/gpt-oss-20b) |
| Deploy   | Docker + docker-compose       |

---

## Getting Started

### Option 1 - Docker (recommended)

```bash
git clone https://github.com/jm-hamdi/Predylics.git
cd Predylics
```

Create `backend/.env`:
```
GROQ_API_KEY=your_groq_api_key
```

Then:
```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API docs: http://localhost:8001/docs

---

### Option 2 - Manual setup

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

**Frontend** (in a separate terminal):
```bash
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend API docs: http://localhost:8001/docs

---

## Dataset

The dataset is a fictional B2B sales CSV with 200 rows:

```
id, date, customer, category, product, quantity, unit_price, country
```

- **200 rows** of sales data
- **5 categories:** Software, Cloud, AI, Hardware, Services
- **6 countries:** France, Germany, Spain, UK, USA, Morocco
- **Date range:** January – June 2026
- **10 customers:** Acme Corp, Globex, Initech, Umbrella Ltd...

Regenerate the dataset:
```bash
python3 data/generate_dataset.py
```

---

## API Endpoints

| Method | Path     | Description                              |
|--------|----------|------------------------------------------|
| GET    | /health  | Health check                             |
| GET    | /data    | List rows (optional ?category= ?country=)|
| GET    | /stats   | Aggregated KPIs and chart data           |
| POST   | /ask     | `{"question": "..."}` → AI answer        |

Full interactive docs available at `http://localhost:8001/docs`

---

## Features

- **KPI Cards** - Total revenue, total orders, top customer, top category
- **Charts** - Revenue by category (bar) + Orders by country (pie)
- **Data Table** - Filterable by category/country, paginated (20 rows/page)
- **AI Assistant** - Ask any question about the data in natural language

---

## Technical Choices

- **FastAPI** - async, auto-generates Swagger docs, clean structure
- **pandas** - standard for CSV processing, fast aggregations
- **Groq API** - free, fast inference for natural language queries
- **React + Vite** - fast dev experience, no SSR complexity needed
- **Tailwind CSS** - utility-first, readable, no config overhead
- **Docker** - one command to run everything, no environment issues

---

*Predylics Technical Test - Software Engineer AI - @jm-hamdi*
