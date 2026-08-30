import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def ask(question: str, data_summary: str) -> str:
    prompt = f"""You are a data analyst assistant. Answer the user's question based only on the sales data summary below.
Be concise and direct. If the answer is not in the data, say so.

Data summary:
{data_summary}

Question: {question}
"""
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )
    return response.choices[0].message.content
