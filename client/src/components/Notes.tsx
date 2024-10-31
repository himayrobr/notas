import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { endpoints } from '../apiConfig';

type Note = {
  _id: string;
  title: string;
  content: string;
  color: string;
};

const Notes: React.FC = () => {
  const { authToken } = useContext(AuthContext);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(endpoints.notes, {
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

  const handleAddNote = async () => {
    if (!title || !content) return;
    try {
      const response = await fetch(endpoints.notes, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, content, color: getRandomColor() }),
      });
      const newNote = await response.json();
      if (response.ok) {
        setNotes([...notes, newNote]);
        setTitle('');
        setContent('');
      } else {
        console.error('Error al crear la nota:', newNote.message);
      }
    } catch (error) {
      console.error('Error al crear la nota:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`${endpoints.notes}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      } else {
        console.error('Error al eliminar la nota');
      }
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  const getRandomColor = () => {
    const colors = ['#FF6961', '#77DD77', '#FFD700', '#89CFF0', '#CFCFC4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      <h2>Tus Notas</h2>
      <div>
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
      <div>
        {notes.map((note) => (
          <div key={note._id} style={{ backgroundColor: note.color }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleDeleteNote(note._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
