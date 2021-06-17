// App Express
const express = require('express');
const app = express();

const products = require('./api/products');

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Template engine
const handlebars = require('express-handlebars');

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: '',
        layoutsDir: ''
    })
);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Socket.io connection
io.on('connection', async socket => {
    console.log('Nuevo usuario conectado');

    socket.emit('products', products.viewAll());

    socket.on('update', data => {
        io.sockets.emit('products', products.viewAll());
    });
});

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Oops! Explotó todo');
});

// Routes
const router = require('./routes/products');
app.use('/api', router);

// Server
const PORT = 8080;

const server = http.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})