from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
import pandas as pd


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


DATABASE_URL = "mysql+pymysql://root:Saaru007%40@localhost:3306/buisness_dasboard"

engine = create_engine(DATABASE_URL)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully 🚀"}

@app.get("/listings")
def get_listings():

    query = "SELECT * FROM listing_master"

    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return df.to_dict(orient="records")