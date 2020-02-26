import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../Login';
import FramePage from '../FramePage';
import './style.scss';

export default function Main() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/index/" exact component={FramePage} />
    </Router>
  );
}
