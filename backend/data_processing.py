import pandas as pd
from pathlib import Path

CSV_PATH = Path(__file__).parent.parent / "data" / "sales_data.csv"

REQUIRED_COLUMNS = {"id", "date", "customer", "category", "product", "quantity", "unit_price", "country"}


def load_data() -> pd.DataFrame:
    if not CSV_PATH.exists():
        raise FileNotFoundError(f"Dataset not found at {CSV_PATH}")

    df = pd.read_csv(CSV_PATH, parse_dates=["date"])

    missing = REQUIRED_COLUMNS - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns: {missing}")

    df = df.dropna()
    df["quantity"] = df["quantity"].astype(int)
    df["unit_price"] = df["unit_price"].astype(float)
    df["revenue"] = df["quantity"] * df["unit_price"]

    return df


def get_rows(df: pd.DataFrame, category: str = None, country: str = None) -> list[dict]:
    filtered = df.copy()
    if category:
        filtered = filtered[filtered["category"].str.lower() == category.lower()]
    if country:
        filtered = filtered[filtered["country"].str.lower() == country.lower()]
    filtered["date"] = filtered["date"].dt.strftime("%Y-%m-%d")
    return filtered.to_dict(orient="records")


def get_stats(df: pd.DataFrame) -> dict:
    top_customer = df.groupby("customer")["revenue"].sum().idxmax()
    top_category = df.groupby("category")["revenue"].sum().idxmax()

    revenue_by_category = (
        df.groupby("category")["revenue"].sum().round(2).to_dict()
    )
    orders_by_country = (
        df.groupby("country")["id"].count().to_dict()
    )

    return {
        "total_revenue": round(df["revenue"].sum(), 2),
        "total_orders": len(df),
        "top_customer": top_customer,
        "top_category": top_category,
        "date_range": {
            "from": df["date"].min().strftime("%Y-%m-%d"),
            "to": df["date"].max().strftime("%Y-%m-%d"),
        },
        "revenue_by_category": revenue_by_category,
        "orders_by_country": orders_by_country,
    }


def get_summary_text(df: pd.DataFrame) -> str:
    stats = get_stats(df)
    lines = [
        f"Total revenue: {stats['total_revenue']}",
        f"Total orders: {stats['total_orders']}",
        f"Top customer: {stats['top_customer']}",
        f"Top category: {stats['top_category']}",
        f"Date range: {stats['date_range']['from']} to {stats['date_range']['to']}",
        "Revenue by category: " + ", ".join(f"{k}={v}" for k, v in stats["revenue_by_category"].items()),
        "Orders by country: " + ", ".join(f"{k}={v}" for k, v in stats["orders_by_country"].items()),
    ]
    return "\n".join(lines)
