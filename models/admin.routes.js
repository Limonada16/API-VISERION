const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mysqlConnection = require('../config/dabatase');

router.post('/addAdmin', async (req, res) => {
    const { email, password } = req.body;
    const queryAdd = 'INSERT INTO admin (`email`, `password`) VALUES (?, ?);';
    const hash = await bcrypt.hash(password, 10);
    console.log(password);
    mysqlConnection.query(queryAdd, [email, hash] ,(err, rows, fields) => {
        if(!err){
            res.status(201).json({ Status: 'Admin Account created successfully' });
        }else{
            console.log(err);
        }
    });
})


router.post('/loginAdmin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // OBJETO PARA JSONWEBTOKEN
    const data = {
        email: req.body.email,
        password : req.body.password
    }
    const queryGet = 'SELECT password FROM admin WHERE email=?'
    mysqlConnection.query(queryGet, [email], async (err, rows, fields) => {
        if (!err) {
            const l = rows[0].password;
            bcrypt.compare(password, l, function(err, result) {
                if(result){
                    jwt.sign({ data }, 'secretkey', (err, token)=>{
                        res.status(200).json({
                            token
                        })
                    })
                    //res.status(200).json({ Status: 'Login successfully' });
                }else{
                    res.status(401).json({ Status: 'You are not an admin' });
                }
            });
            
        } else {
            console.log(err);
        }
    })

})


module.exports = router;