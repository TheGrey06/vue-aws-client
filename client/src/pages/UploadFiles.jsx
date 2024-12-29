import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { putOneObject } from "../api";

const UploadFile = () => {
  const { bucketName } = useParams(); // Get bucket name from URL
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Pass the formData to the putOneObject function
      const response = await putOneObject(bucketName, formData);
      setSuccess(response.data.message);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.error || "Failed to upload file.");
      setSuccess(""); // Clear any previous success messages
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Upload File to {bucketName}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          onChange={handleFileChange}
          className="block mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
