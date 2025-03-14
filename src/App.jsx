import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import RegistrationScreen from './components/RegistrationScreen';
import BettingScreen from './components/BettingScreen';

function App() {
  const base = import.meta.env.BASE_URL;
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router basename={base}>
      <Routes>
        <Route path='/' element={<WelcomeScreen />} />
        <Route path='/register' element={<RegistrationScreen setCurrentUser={setCurrentUser} />} />
        <Route path='/bet' element={<BettingScreen currentUser={currentUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
