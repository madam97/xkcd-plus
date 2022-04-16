import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Comic from './pages/Comic';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comic/:num" element={<Comic />} />
    </Routes>
  );
}

export default App;
