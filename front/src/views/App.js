import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Layout } from 'antd';

import Navbar from '../components/shared/Navbar';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import Home from './Home/Home';

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar></Navbar>
        <Layout>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
