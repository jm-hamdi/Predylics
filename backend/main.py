from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from data_processing import load_data, get_rows, get_stats, get_summary_text
from ai_assistant import ask

app = FastAPI(title="Predylics Data Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

df = load_data()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/data")
def data(
    category: str = Query(None),
    country: str = Query(None),
):
    rows = get_rows(df, category=category, country=country)
    return {"total": len(rows), "rows": rows}


@app.get("/stats")
def stats():
    return get_stats(df)


class Question(BaseModel):
    question: str


@app.post("/ask")
def ask_question(body: Question):
    summary = get_summary_text(df)
    answer = ask(body.question, summary)
    return {"answer": answer}
