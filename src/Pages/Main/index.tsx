import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../Login';
import './style.scss';

export default function Main() {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
    </Router>
  );
}
