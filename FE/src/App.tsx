import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import AddPost from './pages/AddPost';
import ChangePassword from './pages/ChangePassword';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
