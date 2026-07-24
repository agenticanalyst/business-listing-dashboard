import { useEffect, useState } from "react";

function App() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/listings")
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);

  const filteredListings = listings.filter((item) => {
    const matchesSearch = item.business_name
      .toLowerCase()
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

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          fontSize: "48px",
          marginBottom: "25px",
        }}
      >
        Business Listing Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search Business..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          <option value="">All Categories</option>
          <option value="Restaurant">Restaurant</option>
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          <option value="">All Cities</option>
          <option value="Jabalpur">Jabalpur</option>
        </select>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            backgroundColor: "#2563eb",
            color: "white",
          }}
        >
          <tr>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Business Name
            </th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Category
            </th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>City</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Address
            </th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>
              Phone
            </th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={item.id}
              style={{
                backgroundColor:
                  index % 2 === 0 ? "#ffffff" : "#f5f5f5",
              }}
            >
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.id}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.business_name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.category}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.city}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.address}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>

        <strong>Page {currentPage}</strong>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= filteredListings.length}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;