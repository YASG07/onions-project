import React, { useEffect, useState } from 'react'
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Login from './assets/pages/Login-SigUp/Login';
import SignUp from './assets/pages/Login-SigUp/SignUp'
import HomePage from './assets/pages/homePage'
import Profile from './assets/pages/Profile/Profile';


const user = {
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  avatarUrl: 'https://bit.ly/dan-abramov',
  bio: 'Aficionado a las plantas y amante de la naturaleza. Disfruto aprender sobre la biodiversidad y el cuidado de especies.',
  plantCount: 25,
  joinDate: 'Marzo 2021',
  location: 'Ciudad de México, México'
};

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<HomePage/>} />
        <Route path={'/signup'} element={<SignUp/>} />
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={<Profile user={user}/>} />
      </Routes>
    </div>
  );
}

export default App;