from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
import pandas as pd


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000"

    ],
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

# City-wise Count API

@app.get("/city-count")
def city_count():

    query = """
    SELECT city, COUNT(*) AS total
    FROM listing_master
    GROUP BY city
    ORDER BY total DESC
    """

    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return df.to_dict(orient="records")

# category_wise_count

@app.get("/category-count")
def category_count():

    query = """
    SELECT category, COUNT(*) AS total
    FROM listing_master
    GROUP BY category
    ORDER BY total DESC
    """

    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return df.to_dict(orient="records")

# source wise count

@app.get("/source-count")
def source_count():

    query = """
    SELECT source, COUNT(*) AS total
    FROM listing_master
    GROUP BY source
    ORDER BY total DESC
    """

    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return df.to_dict(orient="records")


# search

@app.get("/search")
def search(city: str = "", category: str = ""):

    query = """
    SELECT *
    FROM listing_master
    WHERE city LIKE :city
    AND category LIKE :category
    """

    with engine.connect() as connection:
        df = pd.read_sql(
            text(query),
            connection,
            params={
                "city": f"%{city}%",
                "category": f"%{category}%"
            }
        )

    return df.to_dict(orient="records")

# Total Statistics API

@app.get("/stats")
def stats():

    query = """
    SELECT
        COUNT(*) AS total_business,
        COUNT(DISTINCT city) AS total_cities,
        COUNT(DISTINCT category) AS total_categories,
        COUNT(DISTINCT source) AS total_sources
    FROM listing_master
    """

    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return df.iloc[0].to_dict()

#city

@app.get("/cities")
def cities():

    query = """
    SELECT DISTINCT city
    FROM listing_master
    ORDER BY city
    """

    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return df.to_dict(orient="records")

#category list
@app.get("/categories")
def categories():

    query = """
    SELECT DISTINCT category
    FROM listing_master
    ORDER BY category
    """

    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return df.to_dict(orient="records")

#sourcce list
@app.get("/sources")
def sources():

    query = """
    SELECT DISTINCT source
    FROM listing_master
    ORDER BY source
    """

    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return df.to_dict(orient="records")