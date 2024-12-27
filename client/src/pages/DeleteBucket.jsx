import React, { useState } from "react";
import axios from "axios";

function DeleteBucket() {
  const [bucketName, setBucketName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDeleteBucket = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/bucket/${bucketName}`,
        { withCredentials: true }
      );

      setMessage(response.data.message);
      setBucketName("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete bucket.");
    }
  };

  return (
    <div>
      <h2>Delete S3 Bucket</h2>
      <form onSubmit={handleDeleteBucket}>
        <div>
          <label>Bucket Name:</label>
          <input
            type="text"
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Bucket</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default DeleteBucket;
