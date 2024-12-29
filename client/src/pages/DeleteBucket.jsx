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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Delete S3 Bucket</h2>

      <form onSubmit={handleDeleteBucket} className="space-y-4">
        <div>
          <label htmlFor="bucketName" className="block text-sm font-medium text-gray-700">
            Bucket Name
          </label>
          <input
            type="text"
            id="bucketName"
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none"
        >
          Delete Bucket
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 text-center font-medium">{message}</p>
      )}

      {error && (
        <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
      )}
    </div>
  );
}

export default DeleteBucket;
