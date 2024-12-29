import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout, toggleSidebar }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  // Define the list of possible pages
  const pages = [
    { name: "Buckets", path: "/buckets" },
    { name: "Create Bucket", path: "/create-bucket" },
    { name: "Delete Bucket", path: "/delete-bucket" },
  ];

  // Handle search input change and filter results
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);

    // Filter the list of pages based on the search text
    if (query) {
      const filtered = pages.filter((page) =>
        page.name.toLowerCase().includes(query)
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  // Handle the selection of a search result
  const handleSearchSelect = (page) => {
    navigate(page.path); // Navigate to the selected page
    setSearchText("");  // Clear the search input
    setFilteredResults([]); // Clear the search results
  };

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

      {/* Search bar */}
      {isLoggedIn && (
        <div className="relative">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="bg-gray-700 text-white p-2 rounded-md ml-4"
          />

          {/* Display the filtered search results */}
          {filteredResults.length > 0 && (
            <ul className="absolute left-0 right-0 bg-gray-800 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredResults.map((page) => (
                <li
                  key={page.path}
                  onClick={() => handleSearchSelect(page)}
                  className="cursor-pointer p-2 hover:bg-gray-700"
                >
                  {page.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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
