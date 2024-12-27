// src/components/BucketCard.js
import React from "react";

function BucketCard({ bucket }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-4">{bucket.Name}</h3>
      <p className="text-gray-600">Created: {bucket.CreationDate}</p>
      <p className="text-gray-600">Region: {bucket.Region}</p>
      {/* You can add more bucket details here */}
    </div>
  );
}

export default BucketCard;
