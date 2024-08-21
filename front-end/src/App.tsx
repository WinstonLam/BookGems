// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BookCreation from "./pages/BookCreation";
import BookOverview from "./pages/BookOverview";
import Header from "./pages/Header";

const App: React.FC = () => {
  return (
    <>

      <Router>
        <Header />
        <Routes>

          <Route path="/create" element={<BookCreation />} />
          <Route path="/overview" element={<BookOverview />} />
          {/* Add a default route or redirect if needed */}
          <Route path="/" element={<BookCreation />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
