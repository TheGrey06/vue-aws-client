import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Buckets from "./pages/Buckets";
import CreateBucket from "./pages/CreateBucket";
import DeleteBucket from "./pages/DeleteBucket";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
  
      <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <Login onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/buckets" />}
        />
        <Route
          path="/buckets"
          element={isLoggedIn ? <Buckets onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-bucket"
          element={isLoggedIn ? <CreateBucket /> : <Navigate to="/login" />}
        />
        <Route
          path="/delete-bucket"
          element={isLoggedIn ? <DeleteBucket /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
