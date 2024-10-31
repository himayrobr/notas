const { ObjectId } = require('mongodb');
const connect = require('../helpers/connect');

class Note {
  async getConnect() {
    return await connect();
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
      console.error(error);
      return { status: 500, message: 'Error al crear la nota', data: error.message };
    }
  }
}

module.exports = Note;
