import React, { useState, useEffect } from "react";
import { getBuckets, logout } from "../api";

function Buckets({ onLogout }) {
  const [buckets, setBuckets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const response = await getBuckets();
        setBuckets(response.data.Buckets || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch buckets.");
      }
    };

    fetchBuckets();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (err) {
      setError("Failed to log out.");
    }
  };

  return (
    <div>
      <h2>S3 Buckets</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {buckets.map((bucket) => (
          <li key={bucket.Name}>{bucket.Name}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Buckets;
