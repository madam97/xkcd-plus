import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Comic from './pages/Comic';
import ErrorPage from './pages/ErrorPage';

/**
 * The main component, index file renders it
 * @component
 * @returns {JSX.Element}
 */
const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comic/:num" element={<Comic />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
