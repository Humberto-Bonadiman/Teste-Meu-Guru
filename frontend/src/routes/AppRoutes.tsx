import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import EditUser from '../pages/EditUser';
import Login from '../pages/Login';
import UserPage from '../pages/UserPage';

const App = () => {
  return useRoutes([
    { path: '/', element: <Login /> },
    { path: '/users/:page', element: <UserPage /> },
    { path: '/editUser/:id', element: <EditUser /> }
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
