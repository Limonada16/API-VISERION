const express = require('express');
const router = express.Router();


const mysqlConnection = require('../config/dabatase');

router.post('/addProduct', (req, res) => {
    const { nombre, idcategoria, precio, stock, marca, img } = req.body;
    const queryAdd = 'INSERT INTO producto (`nombre`,`idcategoria`,`precio`,`stock`,`marca`,`img`) VALUES (?,?,?,?,?,?);';

    mysqlConnection.query(queryAdd, [nombre,idcategoria,precio,stock,marca,img] ,(err, rows, fields) => {
        if(!err){
            res.status(201).json({ Status: 'Product created successfully' });
        }else{
            console.log(err);
        }
    });
})

router.get('/getAllProducts', (req, res) => {
    const queryGetProducts = 'SELECT * FROM producto';
    mysqlConnection.query(queryGetProducts, (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

router.get('/getProductById/:id', (req, res) => {
    const queryGetProducts = 'SELECT * FROM producto WHERE idproducto = ?';
    const idProduct = req.params.id;
    mysqlConnection.query(queryGetProducts, [idProduct], (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})

router.put('/updateProductById/:id', (req, res) => {
    const { nombre, idcategoria, precio, stock, marca, img } = req.body;
    const idProduct = req.params.id;
    const queryUpdate = 'UPDATE producto SET `nombre` = ?, `idcategoria` = ?, `precio` = ?, `stock` = ?, `marca` = ?, `img` = ? WHERE `idproducto` = ?;';

    mysqlConnection.query(queryUpdate, [nombre, idcategoria, precio, stock, marca, img, idProduct], (err, rows, fields)=>{
        if(!err){
            res.status(200).json({ Status: 'Product updated successfully' });
        }else{
            console.log(req.params.id);
            console.log(err);
        }
    });
})

router.delete('/deleteProductById/:id', (req, res)=>{
    const idProduct = req.params.id;
    const queryDelete = 'DELETE FROM producto WHERE `idproducto` = ?;';
    mysqlConnection.query(queryDelete, [idProduct], (err, rows, fields)=>{
        if(!err){
            res.json({Status: 'Product Deleted successfully'});
        }else{
            console.log(req.params.id);
            console.log(err);
        }
    })
})

module.exports = router;