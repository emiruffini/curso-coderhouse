const express = require('express');
const fs = require('fs');
const app = express();
 
const puerto = 8000;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});

// Contadores
let viewItems = 0;
let viewRandomItems = 0;

const random = (min, max) => {
    
    return Math.floor(Math.random() * ((max) - min) + min);

}

// Rutas
app.get('/', (req, res) => {
    res.send('Desafío 7');
});

// GET items
app.get('/items', (req, res) => {
    viewItems++;

    try {
        const readFile = fs.readFileSync('./products.txt', 'utf-8');
        const products = JSON.parse(readFile);

        const object = JSON.stringify({
            items: products,
            cantidad: products.length
        }, null, '\t');

        res.send(object);

    } catch(error) {
        console.error(error);
        res.send('Error al encontrar los productos');
    }
});

// GET item random
app.get('/item-random', (req, res) => {
    viewRandomItems++;

    try {
        const readFile = fs.readFileSync('./products.txt', 'utf-8');
        const products = JSON.parse(readFile);

        const randomNum = random(0, products.length);

        const object = JSON.stringify({
            items: products[randomNum]
        }, null, '\t');

        res.send(object);

    } catch(error) {
        console.error(error);
        res.send('Error al encontrar los productos');
    }
});


// GET visitas
app.get('/visitas', (req, res) => {
    const object = JSON.stringify({
        visitas: {
            items: viewItems,
            item: viewRandomItems
        }
    });

    res.send(object);
    
});