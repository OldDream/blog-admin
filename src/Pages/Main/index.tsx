import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../Login';
import FramePage from '../FramePage';
import './style.scss';

export default function Main() {
  return (
    <Router basename="/blog-admin">
      <Route path="/" exact component={Login} />
      <Route path="/index/" component={FramePage} />
    </Router>
  );
}
