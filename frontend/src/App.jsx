import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import { AuthProvider } from './context/UserContext';

function App() {
  return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/post" element={<PostPage />} />
                </Routes>
            </AuthProvider>
        </Router>
  );
}

export default App;