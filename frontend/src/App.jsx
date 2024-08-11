import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import BookPage from './pages/BookPage';
import { AuthProvider } from './context/UserContext';

function App() {
  return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/post" element={<PostPage />} />
                    <Route path="/book/:id" element={<BookPage />} />
                </Routes>
            </AuthProvider>
        </Router>
  );
}

export default App;