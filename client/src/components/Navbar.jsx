import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">My App</div>
        <ul className="flex space-x-4">
          {isLoggedIn && (
            <>
              <li>
                <Link
                  to="/buckets"
                  className="hover:text-gray-300 transition-colors"
                >
                  Buckets
                </Link>
              </li>
              <li>
                <Link
                  to="/create-bucket"
                  className="hover:text-gray-300 transition-colors"
                >
                  Create Bucket
                </Link>
              </li>
              <li>
                <Link
                  to="/delete-bucket"
                  className="hover:text-gray-300 transition-colors"
                >
                  Delete Bucket
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all"
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
