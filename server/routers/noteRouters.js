const router = require("express").Router();
const noteController = require("../controllers/noteController");

router.get("/", noteController.findAllNotes); // Obtener todas las notas
router.get("/:id", noteController.findNoteById); // Obtener nota específica por ID
router.get("/search", noteController.findNotesMatchingTitleOrDescription); // Buscar notas por título o contenido
router.get("/:id/history", noteController.getNoteHistory); // Obtener historial de cambios de una nota
router.post("/", noteController.createNote); // Crear nueva nota
router.post("/:id/history", noteController.updateHistoryNoteById); // Crear historial de una nota
router.put("/:id", noteController.updateNoteById); // Actualizar una nota
router.delete("/:id", noteController.deleteNoteById); // Eliminar una nota

module.exports = router;
