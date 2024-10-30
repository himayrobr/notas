const History = require("../model/noteModel")

exports.updateHistoryNote= async(req, res) =>{
    try{
        const data = {
            id_user: '671f15404548cd303048348f',
            body: {...req.body},
            id: req.params.id,
        }
        const history = new History();
        let result = await history.updateHistoryNoteById(data);
        if(result.data.length == 0) return res.status(400).json({status: 404, message: "Note not found"});
        return res.status(result.status).json(result);

    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err)
    }
}