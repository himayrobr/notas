// src/components/AuthCallback.tsx
import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const AuthCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      login(token);
      navigate('/notes'); // Redirige a la página de notas
    } else {
      // Manejar el caso en que no hay token
      navigate('/login');
    }
  }, [location, login, navigate]);

  return <p>Procesando autenticación...</p>;
};

export default AuthCallback;
