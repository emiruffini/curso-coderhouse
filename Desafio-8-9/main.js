const express = require('express');
const products = require('./api/products');
const router = express.Router();
const handlebars = require('express-handlebars');

// App Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile('index')
})

router.get('/productos/listar', (req, res)=>{

    const items = products.viewAll()
    if (items.length > 0) {
        res.json(items)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
})

router.get('/productos/listar/:id', (req, res) => {
    
    const item = products.viewByID(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.post('/productos/guardar', (req, res) => {
    
    const newItem = products.addProduct(req.body)

    res.json(newItem)
})

router.put('/productos/actualizar/:id', (req, res) => {
    const item = products.updateProduct(req.params.id, req.body)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.delete('/productos/borrar/:id', (req, res) => {
    const item = products.deleteProduct(req.params.id, req.body)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

app.use('/api', router);

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})