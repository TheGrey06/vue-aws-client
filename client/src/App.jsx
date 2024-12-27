import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Buckets from "./pages/Buckets";
import CreateBucket from "./pages/CreateBucket";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <nav>
        {isLoggedIn && (
          <ul>
            <li><Link to="/buckets">Buckets</Link></li>
            <li><Link to="/create-bucket">Create Bucket</Link></li>
            <li><button onClick={() => setIsLoggedIn(false)}>Log Out</button></li>
          </ul>
        )}
      </nav>
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
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
