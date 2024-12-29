import React from "react";

const Navbar = ({ isLoggedIn, onLogout, toggleSidebar }) => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {isLoggedIn && (
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
      )}
      <h1 className="text-2xl font-extralight">Cold Lake</h1>
      {isLoggedIn && (
        <button
          onClick={onLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
