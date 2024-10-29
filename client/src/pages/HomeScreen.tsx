import React, { useEffect, useState } from 'react';
import './HomeScreen.css'; // Asegúrate de que este archivo CSS exista y tenga los estilos necesarios

const HomeScreen: React.FC = () => {
    const [notes, setNotes] = useState<{ title: string; content: string; color: string }[]>(JSON.parse(localStorage.getItem('notes') || '[]'));

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const createNewNote = () => {
        const newNote = { title: 'Nueva Nota', content: '', color: '#fff' };
        setNotes([...notes, newNote]);
    };

    const deleteNote = (index: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
            const newNotes = notes.filter((_, i) => i !== index);
            setNotes(newNotes);
        }
    };

    return (
        <div className="app">
            <header>
                <h1>Notes</h1>
                <div className="header-buttons">
                    <button className="icon-button" aria-label="Buscar">
                        {/* SVG de buscar */}
                    </button>
                    <button className="icon-button" aria-label="Información">
                        {/* SVG de información */}
                    </button>
                </div>
            </header>
            <main id="notesContainer">
                {notes.length === 0 ? (
                    <div className="empty-state">
                        <img src="/assets/img/rafiki.png" alt="Empty notes illustration" />
                        <p>Create your first note!</p>
                    </div>
                ) : (
                    notes.map((note, index) => (
                        <div
                            className="note"
                            key={index}
                            style={{ backgroundColor: note.color }}
                            onClick={() => deleteNote(index)}
                        >
                            <div className="note-title">{note.title}</div>
                            <div className="note-preview">{note.content}</div>
                        </div>
                    ))
                )}
            </main>
            <button className="fab" aria-label="Crear nueva nota" onClick={createNewNote}>
                {/* SVG para el botón flotante */}
            </button>
        </div>
    );
};

export default HomeScreen;
