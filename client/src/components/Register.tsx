// src/components/Register.tsx
import React, { useState } from 'react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Lógica para registrar un nuevo usuario
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        // Redireccionar al usuario a la página de inicio de sesión
        window.location.href = '/login';
      } else {
        alert(data.message || 'Error al registrarse');
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
