const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const mysqlConnection = require('../config/dabatase');

router.post('/addAdmin', async (req, res) => {
    const { email, password } = req.body;
    const queryAdd = 'INSERT INTO admin (`email`, `password`) VALUES (?, ?);';
    const hash = await bcrypt.hash(password, 10);
    console.log(password);
    mysqlConnection.query(queryAdd, [email, hash] ,(err, rows, fields) => {
        if(!err){
            res.json({Status: 'Admin created successfully'});
        }else{
            console.log(err);
        }
    });
})


module.exports = router;