import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { endpoints } from '../apiConfig';
import './AddNoteForm.css'; // Importar el archivo CSS

const AddNoteForm: React.FC<{ onNoteAdded: () => void }> = ({ onNoteAdded }) => {
  const { authToken } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = async () => {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage
    if (!token || !title || !content) return;
    try {
      const response = await fetch(endpoints.notes, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, color: getRandomColor() }),
      });
      const newNote = await response.json();
      if (response.ok) {
        setTitle('');
        setContent('');
        onNoteAdded(); // Notifica que se ha añadido una nueva nota
      } else {
        console.error('Error al crear la nota:', newNote.message);
      }
    } catch (error) {
      console.error('Error al crear la nota:', error);
    }
  };

  const getRandomColor = () => {
    const colors = ['#FF6961', '#77DD77', '#FFD700', '#89CFF0', '#CFCFC4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="add-note-form">
      <h2>Agregar Nueva Nota</h2>
      <input
        type="text"
        placeholder="Título de la nota"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenido de la nota"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleAddNote}>Agregar Nota</button>
    </div>
  );
};

export default AddNoteForm;
