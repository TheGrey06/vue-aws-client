import React, { useState } from "react";
import axios from "axios";

function CreateBucket() {
  const [bucketName, setBucketName] = useState("");
  const [locationConstraint, setLocationConstraint] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateBucket = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/bucket",
        {
          Bucket: bucketName,
          LocationConstraint: locationConstraint || undefined,
        },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      setBucketName("");
      setLocationConstraint("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create bucket.");
    }
  };

  return (
    <div>
      <h2>Create S3 Bucket</h2>
      <form onSubmit={handleCreateBucket}>
        <div>
          <label>Bucket Name:</label>
          <input
            type="text"
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location Constraint (Optional):</label>
          <input
            type="text"
            value={locationConstraint}
            onChange={(e) => setLocationConstraint(e.target.value)}
          />
        </div>
        <button type="submit">Create Bucket</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreateBucket;
