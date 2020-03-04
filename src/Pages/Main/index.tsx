import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login';
import FramePage from '../FramePage';
import NotMatch from '../404';
import './style.scss';

export default function Main() {
  return (
    <BrowserRouter basename="/blog-admin">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/index/" component={FramePage} />
        <Route component={NotMatch} />
      </Switch>
    </BrowserRouter>
  );
}
