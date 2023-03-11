import logo from './logo.svg';
import './App.css';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Home from './components/Home';
import Editprofile from './components/Editprofile';
import { useState } from 'react';
import AddDetails from './components/AddDetails';

function App() {

  return (
    <div className="App bg-black text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/adddetails" element={<AddDetails />} />
        </Routes></BrowserRouter>
    </div>
  );
}

export default App;
