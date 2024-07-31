import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
  return (
        <Router>
        <div>
            <Routes>
                <Route index element={<HomePage />} />
            </Routes>
        </div>
        </Router>
  );
}

export default App;