// src/components/Login.tsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para iniciar sesión con email y contraseña
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
      } else {
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Redireccionar al backend para autenticación social
    window.location.href = `/auth/${provider}`;
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleEmailLogin}>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <h3>O ingresa con:</h3>
      <button onClick={() => handleSocialLogin('google')}>Google</button>
      <button onClick={() => handleSocialLogin('facebook')}>Facebook</button>
      <button onClick={() => handleSocialLogin('discord')}>Discord</button>
    </div>
  );
};

export default Login;
