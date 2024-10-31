const Note = require("../models/noteModel");

exports.findAllNotes = async (req, res) => {
  try {
    const note = new Note();
    const result = await note.getAllNotes(req.user._id); // Usar el id del usuario autenticado
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener notas", error });
  }
};

exports.findNoteById = async (req, res) => {
  try {
    const note = new Note();
    const result = await note.getOneNoteById(req.user._id, req.params.id); // Usar el id del usuario autenticado
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la nota", error });
  }
};

exports.findNotesMatchingTitleOrDescription = async (req, res) => {
  const { searchTerm } = req.query;
  try {
    const note = new Note();
    const result = await note.findNotesMatchingTitleOrDescription(req.user._id, searchTerm); // Usar el id del usuario autenticado
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar notas", error });
  }
};

exports.getNoteHistory = async (req, res) => {
  try {
    const note = new Note();
    const result = await note.getNoteHistory(req.user._id, req.params.id); // Usar el id del usuario autenticado
    return res.status(result.status).json(result);
  } catch (error) {
    const err = JSON.parse(error.message);
    return res.status(err.status).json(err);
  }
};

exports.createNote = async (req, res) => {
  try {
    const note = new Note();
    const result = await note.createNote(req.user._id, req.body); // Usar el id del usuario autenticado
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la nota', error });
  }
};


exports.updateNoteById = async (req, res) => {
  try {
    const note = new Note();
    const result = await note.updateNoteById(req.user._id, req.params.id, req.body); // Usar el id del usuario autenticado
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la nota", error });
  }
};

exports.deleteNoteById = async (req, res) => {
  try {
    const note = new Note();
    const result = await note.deleteNotesById(req.user._id, req.params.id); // Usar el id del usuario autenticado
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la nota", error });
  }
};

exports.updateHistoryNoteById = async (req, res) => {
  try {
    const note = new Note();
    const result = await note.updateHistoryNoteById(req.params.id, req.body, req.user._id); // Usar el id del usuario autenticado
    return res.status(result.status).json(result);
  } catch (error) {
    const err = JSON.parse(error.message);
    return res.status(err.status).json(err);
  }
};
