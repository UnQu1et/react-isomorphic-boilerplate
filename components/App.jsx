import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const App = ({ children }) => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <div>{children}</div>
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
