const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/dabatase');

router.post('/addCategory', (req, res) => {
    const { nombre } = req.body;
    const queryAdd = 'INSERT INTO categoria (`nombre`) VALUES (?);';

    mysqlConnection.query(queryAdd, [nombre] ,(err, rows, fields) => {
        if(!err){
            res.status(201).json({ Status: 'Category created successfully' });
        }else{
            console.log(err);
        }
    });
})
router.put('/updateCategoryById/:id', (req, res) => {
    const { nombre } = req.body;
    const idCategory = req.params.id;
    const queryUpdate = 'UPDATE categoria SET `nombre` = ? WHERE `idcategoria` = ?;';

    mysqlConnection.query(queryUpdate, [nombre, idCategory], (err, rows, fields)=>{
        if(!err){
            res.status(200).json({ Status: 'Category updated successfully' });
        }else{
            console.log(req.params.id);
            console.log(err);
        }
    });
})

module.exports = router;