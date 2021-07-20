const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/dabatase');

router.post('/addClient', (req, res) => {
    const { nombreCompleto, email, password } = req.body;
    const queryAdd = 'INSERT INTO cliente (`nombreCompleto`, `email`, `password`) VALUES (?, ?, ?);';

    mysqlConnection.query(queryAdd, [nombreCompleto, email, password] ,(err, rows, fields) => {
        if(!err){
            res.json({Status: 'Client created successfully'});
        }else{
            console.log(err);
        }
    });
})

router.get('/getAllClients', (req, res) => {
    const queryGetClients = 'SELECT * FROM cliente';
    mysqlConnection.query(queryGetClients, (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})


module.exports = router;