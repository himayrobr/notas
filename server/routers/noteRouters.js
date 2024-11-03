const router = require('express').Router();
const noteController = require('../controllers/noteController');
const authenticate = require('../middleware/auth'); // Middleware de autenticación

router.get('/', authenticate, noteController.findAllNotes); // Obtener todas las notas
router.get('/:id', authenticate, noteController.findNoteById); // Obtener nota específica por ID
router.get('/search', authenticate, noteController.findNotesMatchingTitleOrDescription); // Buscar notas por título o contenido
router.get('/:id/history', authenticate, noteController.getNoteHistory); // Obtener historial de cambios de una nota
router.post('/', authenticate, noteController.createNote); // Crear nueva nota
router.post('/:id/history', authenticate, noteController.updateHistoryNoteById); // Crear historial de una nota
router.put('/:id', authenticate, noteController.updateNoteById); // Actualizar una nota
router.delete('/:id', authenticate, noteController.deleteNoteById); // Eliminar una nota

module.exports = router;
