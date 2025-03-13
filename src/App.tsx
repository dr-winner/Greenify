import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Auth from './pages/Auth';
import Transactions from './pages/Transactions';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;