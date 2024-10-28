const { ObjectId } = require("mongodb");
const connect = require("../helpers/connect");

class Note {
  async getConnect() {
    // Aquí llamas a tu función de conexión
    return await connect();
  }

  async getAllNotes(id_user) {
    try {
      const { data: db } = await this.getConnect();
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
            _id: 0,
            result: {
              $cond: {
                if: { $gte: [{ $size: "$changes" }, 1] },
                then: { $mergeObjects: ["$$ROOT", { $arrayElemAt: ["$changes", -1] }] },
                else: "$$ROOT"
              }
            }
          }
        },
        {
          $replaceRoot: { newRoot: "$result" }
        },
        {
          $project: {
            usuario_id: 0,
            changes: 0,
            status: 0
          }
        },
        {
          $addFields: {
            date: {
              $cond: {
                if: { $not: ["$date"] },
                then: { $toDate: "$_id" },
                else: "$date"
              }
            }
          }
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
      const { data: db } = await this.getConnect();
      const collection = db.collection('Notes');
      const [result] = await collection.aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            status: "visible",
            usuario_id: new ObjectId(id_user)
          }
        },
        {
          $project: {
            _id: 0,
            result: 1
          }
        }
      ]).toArray();

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

  async createNote(id_user, noteData) {
    try {
      const { data: db } = await this.getConnect();
      const collection = db.collection('Notes');
      const newNote = {
        ...noteData,
        usuario_id: new ObjectId(id_user),
        status: "visible",
        changes: [],
        date: new Date()
      };
      const result = await collection.insertOne(newNote);

      return {
        status: 201,
        message: "Nota creada exitosamente",
        data: result.ops[0]
      };

    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Error al crear la nota",
        data: error.message
      };
    }
  }

  async updateNoteById(id_user, id, updateData) {
    try {
      const { data: db } = await this.getConnect();
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

  async updateHistoryNoteById(id, body, id_user) {
    try {
      const { data: db } = await this.getConnect();
      const collection = db.collection('Notes');
      const result = await collection.updateOne(
        {
          _id: new ObjectId(id),
          usuario_id: new ObjectId(id_user)
        },
        {
          $push: { changes: body }
        }
      );

      return {
        status: 214,
        message: "Nota actualizada",
        data: result
      };

    } catch (error) {
      throw new Error(JSON.stringify({ status: 500, message: "Error actualizando el historial de la nota", data: error.message }));
    }
  }

  async deleteNotesById(id_user, id) {
    try {
      const { data: db } = await this.getConnect();
      const collection = db.collection('Notes');
      const result = await collection.updateOne(
        { _id: new ObjectId(id), usuario_id: new ObjectId(id_user) },
        { $set: { status: "not visible" } }
      );

      return {
        status: 200,
        message: "Nota eliminada",
        data: result
      };

    } catch (error) {
      throw new Error(JSON.stringify({ status: 500, message: "Error eliminando la nota", data: error.message }));
    }
  }

  async save(usuario_id, body) {
    try {
      const { data: db } = await this.getConnect();
      const collection = db.collection('Notes');
      const result = await collection.insertOne({
        ...body,
        usuario_id: new ObjectId(usuario_id),
        status: "visible"
      });

      return {
        status: 201,
        message: "Nota guardada",
        data: result
      };

    } catch (error) {
      throw new Error(JSON.stringify({ status: 500, message: "Error guardando la nota", data: error.message }));
    }
  }
}

module.exports = Note;
