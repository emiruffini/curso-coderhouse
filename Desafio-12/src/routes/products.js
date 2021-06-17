const express = require('express');
const router = express.Router();
const products = require('../api/products');

router.get('/productos/vista', (req, res) => {
    
    let items = products.viewAll();

    if (items.length > 0) {
        res.render('productList', { items: products.viewAll(), productsExists: true });
    } else {
        res.render('productList', { items: products.viewAll(), productsExists: false });
    }

});

router.get('/productos/listar', (req, res)=>{
    
    res.json(products.viewAll());

});

router.get('/productos/listar/:id', (req, res) => {
    
    let item = products.viewByID(req.params.id);

    if (item) {
        res.json(item);
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        });
    }

});

router.post('/productos/guardar', (req, res) => {
    
    let newItem = req.body;

    res.json(products.addProduct(newItem));

});

router.put('/productos/actualizar/:id', (req, res) => {
    
    let item = products.updateProduct(req.params.id, req.body);

    if (item) {
        res.json(item);
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        });
    }

});

router.delete('/productos/borrar/:id', (req, res) => {
    
    let item = products.deleteProduct(req.params.id, req.body);

    if (item) {
        res.json(item);
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        });
    }

});

module.exports = router;