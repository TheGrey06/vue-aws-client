// src/components/BucketCard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, logout } from "../api";

function Objects({onLogout}) {
  const [objects, setObjects] = useState([]);
  const [error, setError] =useState("");
}

function BucketCard({ bucket }) {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-4">{bucket.Name}</h3>
      <p className="text-gray-600">Created: {bucket.CreationDate}</p>
      <p className="text-gray-600">Region: {bucket.Region}</p>
      <Link
       to={`/bucket-details/${bucket.Name}`}
       className="text-blue-500 hover:underline"
      >
      View Objects
    </Link>
    <Link
          to={`/upload/${bucket.Name}`} // Navigate to the upload page for this bucket
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Upload File
        </Link>
      {/* You can add more bucket details here */}
    </div>
  );
}

export default BucketCard;
