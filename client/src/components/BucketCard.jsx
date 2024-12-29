import React from "react";
import { Link } from "react-router-dom";

function BucketCard({ bucket }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow border border-gray-200 max-w-sm mx-auto">
      <p className="text-gray-800 text-lg font-semibold mb-2 truncate">{bucket.Name}</p>
      <p className="text-gray-600 text-sm mb-4">
        <strong>Created:</strong> {bucket.CreationDate}
      </p>
      <p className="text-gray-600 text-sm mb-4">
        <strong>Region:</strong> {bucket.Region}
      </p>

      <div className="flex flex-col space-y-2">
        <Link
          to={`/bucket-details/${bucket.Name}`}
          className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
        >
          View Objects
        </Link>

        <Link
          to={`/upload/${bucket.Name}`}
          className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
        >
          Upload File
        </Link>
      </div>
    </div>
  );
}

export default BucketCard;
