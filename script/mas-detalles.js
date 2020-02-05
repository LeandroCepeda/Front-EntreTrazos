//Busca el parametro ID en la URL
var urlParams = new URLSearchParams(window.location.search);
const idLibro = urlParams.get('id');

mostrarMasDetallesLibro(idLibro);

function mostrarMasDetallesLibro(idLibro) {
    fetch("http://localhost:8080/api/libro/" + idLibro)
        .then(respuesta => respuesta.json())
        .then(libro => {
            $('#mas-detalles-libro').append(`<div class="row">
            <div class="shop-item w-100 col-12 row">
                <div class="col-12 col-md-4 text-center mt-5">
                    <img src="${libro.imagen.url}" alt="libro" class="img-fluid border border-secondary shop-item-image">
                </div>
        
                <div class="col-12 col-md-6 text-center text-md-left mt-5">
                        <h2 class="shop-item-title mb-3"><span>Título: </span>${libro.titulo}</h2>
                        <h3 class="shop-item-price">$ ${libro.precio}</h3>
                        <button class="btn btn-secondary mt-3 shop-item-button">
                                <i class="fas fa-cart-plus"></i> Agregar al carro
                        </button>
                </div>
            </div>
            
            <div class="col-12 mt-5">
                <h2 class="ml-4">Reseña del libro</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <div class="col-12 mt-5">
                <h3 class="ml-4">Detalles</h3>
                <p>ISBN: ${libro.isbn}</p>
                <p>Autor: ${libro.autor.nombre}</p>
                <p>Editorial: ${libro.editorial}</p>
                <p>Estado: ${libro.estado}</p>
                <p>Categoría: ${libro.categoria.nombre}</p>
            </div>
               
        </div>`)
        ready();
        })
}
