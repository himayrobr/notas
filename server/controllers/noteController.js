const Note = require("../model/noteModel");

/**
 * @method findAllNotes Obtener todas las notas
 */
exports.findAllNotes = async (req, res) => {
    try {
        const notes = await Note.find(); // Suponiendo que tienes un modelo de Mongoose
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener notas", error });
    }
};

/**
 * @method findNoteById Obtener nota específica por ID
 */
exports.findNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener la nota", error });
    }
};

/**
 * @method findNotesMatchingTitleOrDescription Buscar notas por título o contenido
 */
exports.findNotesMatchingTitleOrDescription = async (req, res) => {
    const { searchTerm } = req.query; // Suponiendo que pasas un término de búsqueda como parámetro de consulta
    try {
        const notes = await Note.find({
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm, $options: "i" } }
            ]
        });
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ message: "Error al buscar notas", error });
    }
};

/**
 * @method getNoteHistory Obtener historial de cambios de una nota
 */
exports.getNoteHistory = async (req, res) => {
    try {
        const note = new Note();
        const result = await note.getHistory(req.params.id, req.data._id); // Asegúrate de que esta función esté implementada
        return res.status(result.status).json(result);
    } catch (error) {
        const err = JSON.parse(error.message);
        return res.status(err.status).json(err);
    }
};

/**
 * @method createNote Crear nueva nota
 */
exports.createNote = async (req, res) => {
    try {
        const note = new Note(req.body); // Asegúrate de que req.body contenga los datos de la nota
        const result = await note.save(); // Guarda la nota en la base de datos
        return res.status(201).json({ status: "Nota creada", note: result });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la nota", error });
    }
};

/**
 * @method updateNoteById Actualizar nota por ID
 */
exports.updateNoteById = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        return res.status(200).json({ status: "Nota actualizada", note });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la nota", error });
    }
};

/**
 * @method deleteNoteById Eliminar nota por ID
 */
exports.deleteNoteById = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        return res.status(200).json({ status: "Nota eliminada" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la nota", error });
    }
};

/**
 * @method updateHistoryNoteById Actualizar historial de una nota
 */
exports.updateHistoryNoteById = async (req, res) => {
    try {
        const note = new Note();
        const result = await note.updateHistory(req.params.id, req.body); // Asegúrate de que esta función esté implementada
        return res.status(result.status).json(result);
    } catch (error) {
        const err = JSON.parse(error.message);
        return res.status(err.status).json(err);
    }
};
