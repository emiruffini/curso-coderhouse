const socket = io.connect();

socket.on('products', function (products) {
    console.log('Productos socket client');
    document.getElementById('data').innerHTML = dataHBS(products)
});

/* obtengo el formulario */
const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = { title: form[0].value, price: form[1].value, thumbnail: form[2].value };

    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        socket.emit('update', 'ok');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
});

function dataHBS(products) {
    const templateTable = `
        {{#if productsExists}}
        <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Imagen</th>
            </tr>
        </thead>
        <tbody>
            {{#each items}}
                <tr>
                    <td scope="col align-middle">{{this.title}}</td>
                    <td scope="col">{{this.price}}</td>
                    <td scope="col"><img src="{{this.thumbnail}}" alt="{{this.title}}" height="50px"></td>
                </tr>
            {{/each}}
        </tbody>
        {{else}}
            <div class="alert alert-warning" role="alert">
                <h3>No hay productos guardados</h3>
            </div>
        {{/if}}
        `

    console.log(products);
    var template = Handlebars.compile(templateTable);
    let html = template({ items: products, productsExists: products.length });
    return html;
}
