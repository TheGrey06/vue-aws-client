import React, { useEffect, useState } from "react";
import api from "../api.js"; // Ensure you import your `api` instance correctly

function BucketFiles({ bucket }) {
  const [objects, setObjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await api.get(`/bucket/${bucket.Name}/objects`);
        setObjects(response.data.Objects || []);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch objects");
      }
    };

    if (bucket && bucket.Name) {
      fetchObjects();
    }
  }, [bucket]); // Add bucket as a dependency

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="text-gray-700 text-base">
        {objects.map((object, index) => (
          <li key={index}>{object}</li>
        ))}
      </ul>
    </div>
  );
}

export default BucketFiles;
