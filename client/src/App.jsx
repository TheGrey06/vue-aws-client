import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Buckets from "./pages/Buckets";
import CreateBucket from "./pages/CreateBucket";
import DeleteBucket from "./pages/DeleteBucket";
import BucketObjects from "./pages/BucketObjects";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state, default closed

  return (
    <Router>
      <div className="flex h-screen">
        {isLoggedIn && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0" // Add left margin to content when sidebar is open
          }`}
        >
          <Navbar
            isLoggedIn={isLoggedIn}
            onLogout={() => setIsLoggedIn(false)}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
          />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route
                path="/login"
                element={
                  !isLoggedIn ? (
                    <Login onLogin={() => setIsLoggedIn(true)} />
                  ) : (
                    <Navigate to="/buckets" />
                  )
                }
              />
              <Route
                path="/buckets"
                element={
                  isLoggedIn ? (
                    <Buckets onLogout={() => setIsLoggedIn(false)} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/create-bucket"
                element={isLoggedIn ? <CreateBucket /> : <Navigate to="/login" />}
              />
              <Route
                path="/delete-bucket"
                element={isLoggedIn ? <DeleteBucket /> : <Navigate to="/login" />}
              />
              <Route
                path="/bucket-details/:bucketName"
                element={isLoggedIn ? <BucketObjects /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
