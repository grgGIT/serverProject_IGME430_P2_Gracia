import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Feed from './components/Feed';
import Profile from './components/Profile';
import PasswordChange from './components/PasswordChange';
import NotFound from './components/NotFound';

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/feed" component={Feed} />
      <Route path="/profile" component={Profile} />
      <Route path="/change-password" component={PasswordChange} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;