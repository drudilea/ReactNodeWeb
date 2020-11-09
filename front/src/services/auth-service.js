import React, { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import { message } from 'antd';
import authHeader from './auth-header';

const API_URL = '/api/auth';

const authContext = createContext();

// Provider component that wraps the app and makes auth object
// available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  useEffect(() => {
    async function validateJwt(auth) {
      if (auth && auth.user) {
        const { uid } = auth.user;
        return await axios
          .get(API_URL + '/validate', {
            headers: authHeader(),
            params: { uid },
          })
          .then((response) => {
            if (!response.data.ok) {
              auth.logout();
            }
          })
          .catch((err) => auth.logout());
      }
      auth.logout();
    }

    validateJwt(auth);
  }, []);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object
// and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const localUser = () => JSON.parse(localStorage.getItem('user')) || null;

  const [user, setUser] = useState(localUser);

  // Wrap any Firebase methods we want to use making sure
  // to save the user to state.
  const login = async (email, password, cb) => {
    return await axios
      .post(API_URL + '/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          let userFinal = { ...response.data.user, token: response.data.token };
          localStorage.setItem('user', JSON.stringify(userFinal));
          setUser(userFinal);
          cb();
        }
      })
      .catch((err) => {
        console.log('ERROR while Login', err.response);
        message.error(err.response.data.msg);
      });
  };

  const register = async (name, email, password, cb) => {
    return await axios
      .post(API_URL + '/register', {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          let userFinal = { ...response.data.user, token: response.data.token };
          localStorage.setItem('user', JSON.stringify(userFinal));
          setUser(userFinal);
        }
        cb();
      })
      .catch((err) => {
        console.log('ERROR while Register', err.response);
        message.error(err.response.data.msg);
      });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(false);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Return the user object and auth methods
  return {
    user,
    login,
    register,
    logout,
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
