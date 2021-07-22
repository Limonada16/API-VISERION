const express = require('express');
const router = express.Router();

const mysqlConnection = require('../config/dabatase');

router.post('/addCarrito', async (req, res) => {
    const { idproducto, totalPrecio, fechaCompra, modoPago, idcliente } = req.body;
    const queryAdd = 'INSERT INTO carrito (`idproducto`, `totalPrecio`, `fechaCompra`, `modoPago`, `idcliente` ) VALUES (?, ?, ?, ?, ?);';
    mysqlConnection.query(queryAdd, [idproducto, totalPrecio, fechaCompra, modoPago, idcliente] ,(err, rows, fields) => {
        if(!err){
            res.status(201).json({ Status: 'Cart created successfully' });
        }else{
            console.log(err);
        }
    });
})


module.exports = router;