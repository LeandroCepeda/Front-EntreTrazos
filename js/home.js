
//PAGINA PRINCIPAL
//Get a todos los libros
fetch("http://localhost:8080/api/libro/")
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {

        for (libro of respuestaJSON) {
            $('#seccion-mas-buscados').append(`
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-5">
                <div class="card h-100 shop-item">
                    <div class="card-img-top">
                        <img class="img-fluid w-100 shop-item-image" src="${libro.imagen.url}" alt="libro 1">
                    </div>
                    <div class="card-body text-center">
                        <h4 class="shop-item-title"><strong>${libro.titulo}</strong></h4>
                        <h5 class="mt-3 shop-item-price">$<strong>${libro.precio}</strong></h5>
                        <button class="btn btn-secondary mt-3 shop-item-button"><i
                                class="fas fa-cart-plus"></i> Agregar al carro</button>

                        <a href="#libro${libro.id}" class="btn color-boton mt-3" data-toggle="modal">Detalles</a>


                        <!--MODAL-->
                        <div class="modal fade" tabindex="-1" id="libro${libro.id}">
                            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                                <div class="modal-content">
                                    <!-- <div class="modal-header">
                                                <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
                                            </div> -->
                                    <div class="modal-body d-block">
                                        <button tyle="button" class="close" data-dismiss="modal"
                                            aria-hidden="true">&times;</button>
                                        <div class="row container"
                                            style="padding-left: 10%; padding-right: 10%;">
                                            <div
                                                class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 container d-block">
                                                <img class="border border-secondary rounded" src="${libro.imagen.url}" alt="libro 1"
                                                    style="text-align: center; width: 80%; margin-top: 15%;">
                                            </div>
                                            <div class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 mt-4 d-block container-fluid"
                                                style="text-align: left;">
                                                <h2 style="margin-top: 10%; text-align: center;"><strong>${libro.titulo}</strong></h2>

                                                <h4 style="text-align: left; margin-top: 10%;">ISBN
                                                </h4>
                                                <p style="text-align: justify; margin-top: 3%; ">${libro.isbn}</p>

                                                <h4 style="text-align: left; margin-top: 10%;">Editorial
                                                </h4>
                                                <p style="text-align: justify; margin-top: 3%; ">${libro.editorial}</p>

                                                <h4 style="text-align: left; margin-top: 10%;">Estado
                                                </h4>
                                                <p style="text-align: justify; margin-top: 3%; ">${libro.estado}</p>

                                                <h4 style="text-align: left; margin-top: 10%;">Autor
                                                </h4>
                                                <p style="text-align: justify; margin-top: 3%; ">${libro.autor.nombre}</p>

                                                <h4 style="text-align: left; margin-top: 10%;">Categoría
                                                </h4>
                                                <p style="text-align: justify; margin-top: 3%; ">${libro.categoria.nombre}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                                                    <h3>Precio: <strong>${libro.precio}</strong></h3>
                                                </div>
                                                <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                                                    <h3>Estado:<strong>${libro.estado}</strong></h3>
                                                </div>
                                                <div class="col-12 col-sm-12 col-md-12 col-lg-6 text-center text-md-right">
                                                    <a href="detalle-libro.html?id=${libro.id}"
                                                        class="btn color-boton" id="boton-modal")">Mas detalles</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!--MODAL-->
                    </div>
                </div>
            </div>`)
        }
        ready();
    })