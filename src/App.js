import React, { useState } from 'react';
import './App.css';
import ContentAreaComp from './Content Area/ContentArea';
import TitleNavbar from './Navbar Comp/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  return (
    <div className="App">
      <Router>
        <TitleNavbar onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={<ContentAreaComp searchQuery={searchQuery} clearSearchQuery={clearSearchQuery} />}
          />
          <Route
            path="/taranga/:id"
            element={<ContentAreaComp searchQuery={searchQuery} clearSearchQuery={clearSearchQuery} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
