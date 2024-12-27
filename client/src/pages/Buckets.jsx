// src/pages/Buckets.js
import React, { useState, useEffect } from "react";
import { getBuckets, logout } from "../api";
import BucketCard from "../components/BucketCard"; // Import BucketCard

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
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">S3 Buckets</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {buckets.map((bucket) => (
          <BucketCard key={bucket.Name} bucket={bucket} /> // Use BucketCard component here
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none"
      >
        Log Out
      </button>
    </div>
  );
}

export default Buckets;
