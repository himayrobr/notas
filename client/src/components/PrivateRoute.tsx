// src/PrivateRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.js';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
