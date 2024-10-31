// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenido a la App de Notas</h1>
      <div>
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button>Crear Nuevo Usuario</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
