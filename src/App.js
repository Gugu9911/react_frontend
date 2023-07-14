import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './views/Home';
import Introduce from './views/Introduce';
import Login from './views/Login';

import Footer from './components/Footer';
import Header from './components/Header';
import Popup from './components/Popup';
import { PopupContext } from './context/GlobalContext';

import './App.css';

const App = () => {
  const [popup, setPopup] = useState(null);

  return (
    <div>
      <PopupContext.Provider value={{ popup, setPopup }} >
      <Header />
      <Popup />
      <div className="app-container">
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
      </PopupContext.Provider>
    </div>
  );
};

export default App;
