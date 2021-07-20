const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/dabatase');

router.post('/addAdmin', (req, res) => {
    const { email, password } = req.body;
    const queryAdd = 'INSERT INTO admin (`email`, `password`) VALUES (?, ?);';

    mysqlConnection.query(queryAdd, [email, password] ,(err, rows, fields) => {
        if(!err){
            res.json({Status: 'Admin created successfully'});
        }else{
            console.log(err);
        }
    });
})


module.exports = router;