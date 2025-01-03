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
    <div className="max-w-3xl mx-auto p-6 bg-slate-200 shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Create S3 Bucket</h2>

      <form onSubmit={handleCreateBucket} className="space-y-4">
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
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="locationConstraint" className="block text-sm font-medium text-gray-700">
            Location Constraint (Optional)
          </label>
          <input
            type="text"
            id="locationConstraint"
            value={locationConstraint}
            onChange={(e) => setLocationConstraint(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Create Bucket
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

export default CreateBucket;
