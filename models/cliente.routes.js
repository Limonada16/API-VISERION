const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mysqlConnection = require('../config/dabatase');

router.post('/addClient', async (req, res) => {

    const { nombreCompleto, email, password } = req.body;
    const queryAdd = 'INSERT INTO cliente (`nombreCompleto`, `email`, `password`) VALUES (?, ?, ?);';
    const hash = await bcrypt.hash(password, 10);
    console.log(password);
    mysqlConnection.query(queryAdd, [nombreCompleto, email, hash], (err, rows, fields) => {
        if (!err) {
            res.status(201).json({ Status: 'Client created successfully' });
        } else {
            console.log(err);
        }
    });


})

router.get('/getAllClients', (req, res) => {
    const queryGetClients = 'SELECT * FROM cliente';
    mysqlConnection.query(queryGetClients, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
})

router.post('/loginClient', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const queryGet = 'SELECT password FROM cliente WHERE email=?'
    mysqlConnection.query(queryGet, [email], async (err, rows, fields) => {
        if (!err) {
            const l = rows[0].password;
            console.log(l);
            bcrypt.compare(password, l, function(err, result) {
                if(result){
                    res.status(200).json({ Status: 'Login successfully' });
                }else{
                    res.status(401).json({ Status: 'You are not a client' });
                }
            });
            
        } else {
            console.log(err);
        }
    })

})

module.exports = router;