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

// 錯誤邊界組件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('路由錯誤:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>發生錯誤</h1>
          <button onClick={() => window.location.href = '/'}>
            返回首頁
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

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

  return (
    <Router basename={base}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </Router>
  );
}

export default App;
