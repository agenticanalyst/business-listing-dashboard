import pandas as pd
from sqlalchemy import create_engine

engine = create_engine(
    "mysql+pymysql://root:Saaru007%40@localhost:3306/buisness_dasboard"
)

df = pd.read_csv("business_listings.csv")
df.columns = df.columns.str.strip()

df = df.rename(columns={
    "Business Name": "business_name",
    "Category": "category",
    "City": "city",
    "Address": "address",
    "Phone": "phone",
    "Source": "source"
})

# Sirf required columns
df = df[[
    "business_name",
    "category",
    "city",
    "address",
    "phone",
    "source"
]]

# Missing values ko handle karo
df = df.fillna("")

print(df.head())

df.to_sql(
    "listing_master",
    engine,
    if_exists="append",
    index=False,
    method="multi"
)

print("✅ Data Inserted Successfully")