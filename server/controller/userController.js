const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const fs = require("fs");
const user = require("../model/usermodel")


export.addNewUser = async(req, res)=>{
    try {
        let user = new User();
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let resultPOST = await user.save(req.body)
    }
}

