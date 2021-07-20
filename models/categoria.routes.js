const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/dabatase');

router.post('/addCategory', (req, res) => {
    const { nombre } = req.body;
    const queryAdd = 'INSERT INTO categoria (`nombre`) VALUES (?);';

    mysqlConnection.query(queryAdd, [nombre] ,(err, rows, fields) => {
        if(!err){
            res.json({Status: 'Category created successfully'});
        }else{
            console.log(err);
        }
    });
})


module.exports = router;