import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../components/App';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';

export default (
  <Route component={App} path="/">
    <IndexRoute component={HomePage} />
    <Route component={AboutPage} path="about" />
  </Route>
);
