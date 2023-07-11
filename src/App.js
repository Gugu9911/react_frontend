import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import Introduce from './views/Introduce';
import Login from './views/Login';

import Footer from './components/Footer';
import Header from './components/Header';

import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <div className="app-container">
        <div className="content-container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
