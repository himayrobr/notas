const { ObjectId } = require('mongodb');
const connect = require('../helpers/connect');

class Note {
  async getConnect() {
    try {
      const db = await connect();
      return { data: db }; // Asegúrate de devolver el objeto correcto
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      throw error;
    }
  }

  async getAllNotes(id_user) {
    try {
      const { data: db } = await this.getConnect();
      const collection = db.collection('Notes');
      const notes = await collection.find({ usuario_id: new ObjectId(id_user), status: "visible" }).toArray();
      return { status: 200, data: notes };
    } catch (error) {
      console.error('Error al obtener notas:', error);
      return { status: 500, message: 'Error al obtener notas', data: error.message };
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
      if (result.matchedCount === 0) {
        return { status: 404, message: "Nota no encontrada" };
      }
      return { status: 200, message: "Nota eliminada exitosamente", data: result };
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
      return { status: 500, message: "Error al eliminar la nota", data: error.message };
    }
  }



  async createNote(id_user, noteData) {
    try {
      const { data: db } = await this.getConnect();
      const collection = db.collection('Notes');
      const newNote = {
        ...noteData,
        usuario_id: new ObjectId(id_user),
        status: 'visible',
        changes: [],
        date: new Date()
      };
      const result = await collection.insertOne(newNote);
      return { status: 201, message: 'Nota creada exitosamente', data: newNote };
    } catch (error) {
      console.error('Error al crear la nota:', error);
      return { status: 500, message: 'Error al crear la nota', data: error.message };
    }
  }
}

module.exports = Note;
