const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');

class NoteModel {
    constructor() {
        this.uri = process.env.MONGO_URI; // Ajusta según tu cadena de conexión
        this.client = new MongoClient(this.uri);
    }

    async getConnect() {
        try {
            await this.client.connect();
            const database = this.client.db(process.env.MONGO_DB_NAME);
            return { status: 200, message: "Conexión exitosa", data: database };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error en la conexión", data: error.message };
        }
    }

    async getAllNotes(id_user) {
        try {
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection('Notes');

            const result = await collection.aggregate([
                {
                    $match: {
                        status: "visible",
                        usuario_id: new ObjectId(id_user)
                    }
                },
                {
                    $project: {
                        changes: { $arrayElemAt: ["$changes", -1] },
                        _id: 1,
                        date: {
                            $ifNull: ["$date", { $toDate: "$_id" }]
                        }
                    }
                },
                {
                    $addFields: {
                        content: { $ifNull: ["$changes", "$$ROOT"] }
                    }
                },
                {
                    $replaceRoot: { newRoot: "$content" }
                }
            ]).toArray();

            return {
                status: 200,
                message: "Notas obtenidas exitosamente",
                data: result
            };

        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: "Error al obtener notas",
                data: error.message
            };
        }
    }

    async getOneNoteById(id_user, id) {
        try {
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection('Notes');
            const result = await collection.findOne(
                {
                    _id: new ObjectId(id),
                    status: "visible",
                    usuario_id: new ObjectId(id_user)
                },
                {
                    projection: { usuario_id: 0, status: 0 }
                }
            );

            return {
                status: 200,
                message: "Nota obtenida exitosamente",
                data: result
            };

        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: "Error al obtener la nota",
                data: error.message
            };
        }
    }

    async updateHistoryNoteById(id, body, id_user) {
        try {
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection('Notes');

            const result = await collection.updateOne(
                {
                    _id: new ObjectId(id),
                    usuario_id: new ObjectId(id_user)
                },
                { $push: { changes: body } }
            );

            return {
                status: 214,
                message: "Historial de cambios actualizado",
                data: result
            };

        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: "Error al actualizar el historial",
                data: error.message
            };
        }
    }

    async updateNoteById(id_user, id, updateData) {
        try {
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection('Notes');
            const result = await collection.updateOne(
                { _id: new ObjectId(id), usuario_id: new ObjectId(id_user) },
                { $set: updateData }
            );

            if (result.matchedCount === 0) {
                return {
                    status: 404,
                    message: "Nota no encontrada"
                };
            }

            return {
                status: 200,
                message: "Nota actualizada exitosamente",
                data: updateData
            };

        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: "Error al actualizar la nota",
                data: error.message
            };
        }
    }

    async deleteNoteById(id_user, id) {
        try {
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection('Notes');

            const result = await collection.updateOne(
                { _id: new ObjectId(id), usuario_id: new ObjectId(id_user) },
                { $set: { status: "deleted" } }
            );

            if (result.matchedCount === 0) {
                return {
                    status: 404,
                    message: "Nota no encontrada"
                };
            }

            return {
                status: 200,
                message: "Nota eliminada exitosamente",
                data: null
            };

        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: "Error al eliminar la nota",
                data: error.message
            };
        }
    }

    async closeConnection() {
        await this.client.close();
    }
}

module.exports = NoteModel;
