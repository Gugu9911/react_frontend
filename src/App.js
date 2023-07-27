import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import Home from './views/Home';
import Introduce from './views/Introduce';
import Self from './views/Self';
import Notes from './views/Notes';
import Release from './views/Release';


import Footer from './components/Footer';
import Header from './components/Header';
import Popup from './components/Popup';
import PersonInfo from './components/PersonInfo';
import AddNote from './components/AddNote';
import Register from './components/Register';
import Login from './components/Login';

import { PopupContext } from './context/GlobalContext';
import { UserContext } from './context/GlobalContext';

import noteService from './services/note';


import './App.css';



const App = () => {
  const [popup, setPopup] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user);
      noteService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <PopupContext.Provider value={{ popup, setPopup }} >
      <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Popup />
      <div className="app-container">
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/release" element={<Release />} />
            <Route path="/self" element={<Self />} />
            <Route path="/addnote" element={<AddNote />} />
            <Route path="/personinfo" element={<PersonInfo />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
      </UserContext.Provider>
      </PopupContext.Provider>
    </div>
  );
};

export default App;
