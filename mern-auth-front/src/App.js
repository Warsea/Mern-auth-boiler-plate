import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import UserContext from './context/UserContext';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Header from './components/layout/Header';
import './styles.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenRes = await Axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        {
          headers: { 'x-auth-token': token },
        }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:5000/users/', {
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
