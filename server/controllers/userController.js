const bcrypt = require("bcryptjs");
const UserModel = require("../model/userModel"); // Asegúrate de que la ruta sea correcta

// Función para agregar un nuevo usuario
exports.addNewUser = async (req, res) => {
    try {
        const userModel = new UserModel();

        // Hashea la contraseña proporcionada
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // Crea un nuevo usuario en la base de datos
        const resultPOST = await userModel.createUser(req.body);

        // Respuesta de éxito
        res.status(201).json({
            status: 201,
            message: "Usuario creado exitosamente",
            data: resultPOST
        });
    } catch (error) {
        console.error(error);
        // Respuesta de error
        res.status(500).json({
            status: 500,
            message: "Error al crear el usuario",
            data: error.message
        });
    }
};
