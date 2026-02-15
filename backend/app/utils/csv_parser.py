import pandas as pd
from io import StringIO


def parse_csv(contents: bytes):
    df = pd.read_csv(StringIO(contents.decode()))

    # normalize column names
    df.columns = df.columns.str.strip().str.lower()

    if "domain" not in df.columns:
        raise ValueError(
            f"'domain' column not found. Found columns: {list(df.columns)}"
        )

    return df["domain"].dropna().astype(str).str.strip().unique().tolist()
