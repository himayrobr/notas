const { ObjectId } = require("mongodb");
const connect = require("../helpers/connect");
module.exports = class History extends connect {
  constructor() {
    super();
  }

  async updateHistoryNoteById({ id, body, id_user }) {
    try {
      body.date = new Date();
      const { status, message, data: db } = await this.getConnect();
      const collection = db.collection("Notes");
      const result = await collection.updateOne(
        {
          _id: new ObjectId(id),
          usuario_id: new ObjectId(id_user)
        },
        { $push: { changes: body } }
      );
      return { status: 201, message: "History note updated", data: result };
    } catch (error) {
      throw new Error(JSON.stringify({ status: 500, message: "Error getting all notes", data: error }));
    }
  }
};

