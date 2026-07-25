import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  FaBuilding,
  FaSearch,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaDatabase,
  FaChevronLeft,
  FaChevronRight,
  FaPhone,
} from "react-icons/fa";

import "./App.css";

const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
  "#14B8A6",
];

function App() {
  const [listings, setListings] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sourceData, setSourceData] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/listings")
      .then((res) => res.json())
      .then((data) => setListings(data));

    fetch("http://127.0.0.1:8000/city-count")
      .then((res) => res.json())
      .then((data) => setCityData(data));

    fetch("http://127.0.0.1:8000/category-count")
      .then((res) => res.json())
      .then((data) => setCategoryData(data));

    fetch("http://127.0.0.1:8000/source-count")
      .then((res) => res.json())
      .then((data) => setSourceData(data));

  }, []);

  const filteredListings = listings.filter((item) => {
    const matchesSearch = item.business_name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || item.category === category;

    const matchesCity =
      city === "" || item.city === city;

    return matchesSearch && matchesCategory && matchesCity;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredListings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalCategories = [
    ...new Set(listings.map((item) => item.category)),
  ].filter(Boolean).length;

  const totalCities = [
    ...new Set(listings.map((item) => item.city)),
  ].filter(Boolean).length;

  const totalPages =
    Math.ceil(filteredListings.length / itemsPerPage) || 1;

  return (
    <div className="dashboard">
          <div className="hero">
        <div className="hero-top">
          <span className="hero-pill">SaaS Management Suite</span>

          <span className="hero-status">
            <span className="status-dot"></span>
            System Operational
          </span>
        </div>

        <h1>Business Listing Dashboard</h1>

        <p>
          Manage and explore business listings with FastAPI + MySQL Engine
        </p>
      </div>

      <div className="stats">
        <div className="card">
          <div className="icon-wrapper icon-blue">
            <FaBuilding className="icon" />
          </div>

          <div className="card-body">
            <p>Total Listings</p>
            <h2>{filteredListings.length}</h2>
          </div>
        </div>

        <div className="card">
          <div className="icon-wrapper icon-purple">
            <FaLayerGroup className="icon" />
          </div>

          <div className="card-body">
            <p>Categories</p>
            <h2>{totalCategories}</h2>
          </div>
        </div>

        <div className="card">
          <div className="icon-wrapper icon-emerald">
            <FaMapMarkerAlt className="icon" />
          </div>

          <div className="card-body">
            <p>Cities</p>
            <h2>{totalCities}</h2>
          </div>
        </div>

        <div className="card">
          <div className="icon-wrapper icon-amber">
            <FaDatabase className="icon" />
          </div>

          <div className="card-body">
            <p>Backend Engine</p>
            <h2>FastAPI</h2>
          </div>
        </div>
      </div>

      <div className="filter-card">
        <div className="filter-header">
          <span className="filter-title">
            Search & Filters
          </span>

          {(search || category || city) && (
            <button
              className="btn-clear-filters"
              onClick={() => {
                setSearch("");
                setCategory("");
                setCity("");
                setCurrentPage(1);
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search Business..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="select-filter"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>

            {[...new Set(listings.map((item) => item.category))]
              .filter(Boolean)
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>

          <select
            className="select-filter"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Cities</option>

            {[...new Set(listings.map((item) => item.city))]
              .filter(Boolean)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      </div>
   
         <div className="table-card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Business Name</th>
                <th>Category</th>
                <th>City</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => {
                  const categorySlug = item.category
                    ? item.category.toLowerCase().replace(/[^a-z0-9]/g, "")
                    : "default";

                  return (
                    <tr key={item.id}>
                      <td className="id-cell">#{item.id}</td>

                      <td className="business-name-cell">
                        {item.business_name}
                      </td>

                      <td>
                        <span
                          className={`badge badge-category badge-${categorySlug}`}
                        >
                          {item.category}
                        </span>
                      </td>

                      <td>
                        <div className="city-cell">
                          <FaMapMarkerAlt className="city-icon" />
                          <span>{item.city}</span>
                        </div>
                      </td>

                      <td className="address-cell">
                        {item.address}
                      </td>

                      <td className="phone-cell">
                        <a
                          href={`tel:${item.phone}`}
                          className="phone-link"
                        >
                          <FaPhone className="phone-icon" />
                          <span>{item.phone}</span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="empty-state">
                    No business listings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="table-card" style={{ marginTop: 30 }}>
        <h2>City-wise Business Count</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={cityData}>
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

            <div className="table-card" style={{ marginTop: 30 }}>
        <h2>Category-wise Business Count</h2>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="total"
              nameKey="category"
              outerRadius={120}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="table-card" style={{ marginTop: 30 }}>
        <h2>Source-wise Business Count</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={sourceData}>
            <XAxis dataKey="source" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#22C55E" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing {filteredListings.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
          {Math.min(indexOfLastItem, filteredListings.length)} of{" "}
          {filteredListings.length} listings
        </div>

        <div className="pagination-controls">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="btn-pagination"
          >
            <FaChevronLeft className="btn-icon" />
            Previous
          </button>

          <div className="page-numbers">
            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`page-pill ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="btn-pagination"
          >
            Next
            <FaChevronRight className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;