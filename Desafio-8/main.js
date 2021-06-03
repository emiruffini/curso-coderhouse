const express = require('express')
const products = require('./api/products')

// App Express
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080


app.get('/', (req, res)=>{
    res.send('Bienvenidos al desafío 8')
})

app.get('/api/productos/listar', (req, res)=>{

    const items = products.viewAll()
    if (items.length > 0) {
        res.json(items)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
})

app.get('/api/productos/listar/:id', (req, res)=>{
    
    const item = products.viewByID(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

app.post('/api/productos/guardar', (req, res) => {
    
    const newItem = products.addProduct(req.body)

    res.json(newItem)
})



const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})