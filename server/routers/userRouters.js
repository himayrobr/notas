// server/routers/userRouters.js
const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/login', userController.loginUser);
router.post('/register', userController.addNewUser);
router.post('/logout', userController.logoutUser);

router.put('/:id', userController.updateUser); 
router.delete('/:id', userController.deleteUser);

module.exports = router;
