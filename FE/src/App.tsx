import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import AddPost from './pages/AddPost';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Chat from './pages/Chat';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/change-profile' element={<Profile />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
