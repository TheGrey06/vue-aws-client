import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBucketObjects } from "../api"; // Add an API utility to call the backend

function BucketObjects() {
  const { bucketName } = useParams(); // Extract bucket name from URL params
  const [objects, setObjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await getBucketObjects(bucketName); // Call the backend API
        setObjects(response.data.objects || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch objects.");
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, [bucketName]);

  if (loading) return <p>Loading objects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Objects in {bucketName}</h2>
      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Key</th>
            <th className="px-4 py-2">Last Modified</th>
            <th className="px-4 py-2">Size (Bytes)</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {objects.length > 0 ? (
    objects.map((object) => (
      <tr key={object.Key} className="border-t">
        <td className="px-4 py-2">{object.Key}</td>
        <td className="px-4 py-2">
          {object.LastModified ? new Date(object.LastModified).toLocaleString() : "N/A"}
        </td>
        <td className="px-4 py-2">{object.Size} bytes</td>
        <td className="px-4 py-2">
          <button className="text-blue-500 hover:underline">Download</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center py-4">
        No objects found in this bucket.
      </td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
}

export default BucketObjects;
