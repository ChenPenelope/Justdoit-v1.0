import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css';
import { checkAdminPassword } from './api/userApi';
import AdminLogin from './components/AdminLogin';
import BettingScreen from './components/BettingScreen';
import ListScreen from './components/ListScreen';
import RegistrationScreen from './components/RegistrationScreen';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const base = import.meta.env.BASE_URL;
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminCookie = Cookies.get('isAdmin');
    if (adminCookie) {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = async (password) => {
    const success = await checkAdminPassword(password);
    if (success) {
      Cookies.set('isAdmin', true, { expires: 1 });
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  // remove the cookie when testing the login
  Cookies.remove('isAdmin');

  return (
    <Router basename={base}>
      <Routes>
        <Route path='/' element={<WelcomeScreen />} />
        <Route path='/register' element={<RegistrationScreen setCurrentUser={setCurrentUser} />} />
        <Route path='/bet' element={<BettingScreen currentUser={currentUser} />} />
        <Route
          path='/list'
          element={isAdmin ? <ListScreen /> : <AdminLogin onLogin={handleAdminLogin} />}
        />
        <Route
          path='*'
          element={Cookies.get('username') ? <Navigate to='/bet' /> : <Navigate to='/register' />}
        />
      </Routes>
    </Router>
  );
}

export default App;
