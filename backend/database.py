from sqlalchemy import create_engine

DATABASE_URL = "mysql+pymysql://root:Saaru007@@localhost:3306/buisness_dasboard"

engine = create_engine(DATABASE_URL)