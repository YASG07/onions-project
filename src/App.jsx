import React, { useEffect, useState } from 'react'
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Login from './assets/pages/Login-SigUp/Login';
import SignUp from './assets/pages/Login-SigUp/SignUp'
import HomePage from './assets/pages/homePage'
function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Login/>} />
        <Route path={'/signup'} element={<SignUp/>} />
        <Route path={'/homepage'} element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;