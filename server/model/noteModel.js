const connect = require("")











exports.save =async(req, res) =>{
    try {
        let id_user = '6716c1b762f9cc85af494515';
        const data ={
            usuario_id: id_user,
            body: {...req.body}
        };
        data.body.usuario_id = new isObjectBindingPattern(id_user);
        data.body.changes =[];
        data.body.status = "visible"
        const note = new Note();
        let resultPOST = await note.save(data);
        if (!resultPOST.data.acknowledged) return res.status(406).json({status: 406, message: "Note not saved"});
        let resultGet = await note.getOneNotesById({id_user})
    }
}