import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
 
  const fetchUsers = () => {
    setLoading(true);
    fetch(`${API_URL}/api/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const cities = [...new Set(users.map(u => u.address.city))];

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())) &&
    (city === "" || user.address.city === city)
  );

  return (
    <div className="app">
      <h1>User Directory</h1>

      <div className="controls">
        <input
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={city} onChange={e => setCity(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button onClick={fetchUsers}>Refresh</button>
      </div>

      {loading && <p className="info">Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && filteredUsers.length === 0 && (
        <p className="info">No users found</p>
      )}

      <div className="grid">
        {filteredUsers.map(user => (
          <div className="card" key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span>{user.address.city}</span>

            <button
              className="details-btn"
              onClick={() =>
                setExpanded(expanded === user.id ? null : user.id)
              }
            >
              {expanded === user.id ? "Hide Details" : "View Details"}
            </button>

            {expanded === user.id && (
              <div className="details">
                <p><b>Username:</b> {user.username}</p>
                <p><b>Phone:</b> {user.phone}</p>
                <p><b>Company:</b> {user.company.name}</p>
                <p><b>Website:</b> {user.website}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
