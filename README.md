# 📊 Business Listing Dashboard

A full-stack Business Listing Dashboard built using **React.js, FastAPI, and MySQL**. The application collects business listings through web scraping, stores them in a MySQL database, and visualizes aggregated insights using interactive charts.

---

## 🚀 Features

- Web scraping of business listings
- MySQL database integration
- FastAPI REST APIs
- React.js frontend
- Interactive charts using Recharts
- Search and filter functionality
- City-wise business count
- Category-wise business count
- Source-wise business count

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- Recharts
- CSS

### Backend
- FastAPI
- SQLAlchemy
- Pandas
- PyMySQL

### Database
- MySQL
  ![p](https://github.com/agenticanalyst/business-listing-dashboard/blob/main/frontend/database.png)

---

## 📂 Project Structure

```
Business-Listing-Dashboard/
│
├── backend/
│   ├── main.py
│   ├── insert_data.py
│   ├── business_listings.csv
│   ├── hospital_scraper.py
│   ├── cafe_scraper.py
│   ├── gym_scraper.py
│   ├── hotels_scraper.py
│   ├── Restaurant_scraper.py
│   └── merge_csv.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
└── README.md
```

---

## 🗄️ Database Schema

Table Name:

```
listing_master
```

Columns

- id
- business_name
- category
- city
- address
- phone
- source
- created_at

---

## 🔗 API Endpoints

### Get All Listings

```
GET /listings
```

### Dashboard Statistics

```
GET /stats
```

### City-wise Count

```
GET /city-count
```

### Category-wise Count

```
GET /category-count
```

### Source-wise Count

```
GET /source-count
```

---

## 📊 Dashboard

The dashboard displays

- Total Listings
- Total Cities
- Total Categories
- City-wise Chart
- Category-wise Chart
- Source-wise Chart

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/agenticanalyst/business-listing-dashboard.git
```

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📸 Screenshots
1. Dashboard Home 
Total Listings
Total Cities
Total Categories
![p](https://github.com/agenticanalyst/business-listing-dashboard/blob/main/frontend/Screenshot%202026-07-25%20230440.png)

2. City-wise Chart

Jisme:

Jabalpur → 49
Bhopal → 30
![p](https://github.com/agenticanalyst/business-listing-dashboard/blob/main/frontend/Screenshot%202026-07-25%20230518.png)

3. Category-wise Chart
![p](https://github.com/agenticanalyst/business-listing-dashboard/blob/main/frontend/Screenshot%202026-07-25%20230621.png)

4. Source-wise Chart
![p](https://github.com/agenticanalyst/business-listing-dashboard/blob/main/frontend/Screenshot%202026-07-25%20230637.png)

5. FastAPI Swagger Docs 
![p](https://github.com/agenticanalyst/business-listing-dashboard/blob/main/frontend/Screenshot%202026-07-25%20230323.png)

6. MySQL Database
![p](https://github.com/agenticanalyst/business-listing-dashboard/blob/main/frontend/image.90.png)


---

## 🎯 Challenges Faced

- Web scraping and data cleaning
- Handling duplicate and missing records
- MySQL integration
- Building REST APIs with FastAPI
- React chart visualization

---

## 👨‍💻 Author

**Saurabh Sen**

GitHub:
https://github.com/agenticanalyst
