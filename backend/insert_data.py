import pandas as pd
from sqlalchemy import create_engine

DATABASE_URL = "mysql+pymysql://root:Saaru007%40@localhost:3306/buisness_dasboard"

engine = create_engine(DATABASE_URL)

df = pd.read_csv("restaurants.csv")
# Assignment ke table ke columns ke hisaab se data set karte hain
df["category"] = "Restaurant"
df["city"] = "Jabalpur"
df["source"] = "Justdial"

# Columns ka order table jaisa rakho
df = df[
    [
        "Business Name",
        "category",
        "city",
        "Address",
        "Phone",
        "source",
    ]
]

# Table ke column names se match karao
df.columns = [
    "business_name",
    "category",
    "city",
    "address",
    "phone",
    "source",
]

df.to_sql(
    "listing_master",
    con=engine,
    if_exists="append",
    index=False,
)

print("Data Inserted Successfully ✅")