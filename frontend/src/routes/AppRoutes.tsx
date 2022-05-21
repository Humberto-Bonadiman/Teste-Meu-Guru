import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Users from '../pages/Users';

const App = () => {
  return useRoutes([
    { path: '/', element: <Navigate to="/users/1" /> },
    { path: '/users/:page', element: <Users /> }
  ]);
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRoutes;
