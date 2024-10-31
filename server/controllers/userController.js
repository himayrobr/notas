const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.addNewUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: req.body.password,
      name: req.body.name || 'Usuario', // Asignar un nombre por defecto si no se proporciona
      provider: 'local', // Proveedor predeterminado para registro local
      providerId: 'local', // ID del proveedor predeterminado para registro local
    });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Sesión cerrada' });
};

// Asegúrate de tener definidas estas funciones si las rutas las llaman
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado', data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};
