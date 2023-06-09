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
import MeetPeople from './components/MeetPeople';
import FriendsPage from './components/FriendsPage';

function App() {

  return (
    <div className="App bg-[#e2eefe] text-white">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/:id" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/adddetails" element={<AddDetails />} />
          <Route path="/meetpeople" element={<MeetPeople />} />
          <Route path="/friends/:id" element={<FriendsPage />} />
        </Routes></BrowserRouter>
    </div>
  );
}

export default App;
