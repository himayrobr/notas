// src/Notes.tsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext.js';

type Note = {
  _id: string;
  title: string;
  content: string;
};

const Notes = () => {
  const { authToken, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setNotes(data);
        } else {
          console.error('Error al obtener las notas:', data.message);
        }
      } catch (error) {
        console.error('Error al obtener las notas:', error);
      }
    };
    fetchNotes();
  }, [authToken]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Tus Notas</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay notas disponibles.</p>
      )}
    </div>
  );
};

export default Notes;
