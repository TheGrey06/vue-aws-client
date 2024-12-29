import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
                <button
          className="text-white"
          onClick={toggleSidebar} // Toggle sidebar visibility
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Dashboard
      </div>
      <nav className="p-4 space-y-4">
        <Link to="/buckets" className="block hover:text-gray-300">
          Buckets
        </Link>
        <Link to="/create-bucket" className="block hover:text-gray-300">
          Create Bucket
        </Link>
        <Link to="/delete-bucket" className="block hover:text-gray-300">
          Delete Bucket
        </Link>
      </nav>
      <button
        className="absolute top-4 right-4 md:hidden text-white"
        onClick={toggleSidebar} // Toggle sidebar visibility
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
