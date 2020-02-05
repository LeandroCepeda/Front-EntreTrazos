function cargarMas(){
  var contenidoNuevo = '<div class="col-md-3 col-sm-6 col-12 mb-5"><div class="card h-100"><div class="card-img-top"><img class="img-fluid w-100" src="img/libro1.jpg" alt="libro 1"></div><div class="card-body text-center"><h4><strong>El libro de los libros</strong></h4><h5 class="mt-3">Precio: <strong>$300</strong></h5><span class="mt-3">Cantidad</span><select class="mt-3" name="cantidadASumar" id="cantidadASumar"><option value="1">1</option>
    < option value = "2" > 2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
          </select >
    <a href="carrito.html" class="btn btn-danger mt-3"><i class="fas fa-cart-plus"></i>Agregar al carro</a>
    <!-- < a style = "text-decoration: none; color: black;" href = "productos/accion/elLibroDeLosLibros.html" > mas detalles</a > -->

      <a href="#libroDeLibros" class="btn btn-primary mt-3" data-toggle="modal">Detalles</a>

      <div class="modal fade" tabindex="-1" id="libroDeLibros">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
          <div class="modal-content">
            <!-- <div class="modal-header">
              <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div> -->
                      <div class="modal-body d-block">
              <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <div class="row container" style="padding-left: 10%; padding-right: 10%;">
                <div class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 container d-block" >
                  <img class="" src="img/libro1.jpg" alt="libro 1" style="text-align: center; width: 80%; margin-top: 15%;">
                               </div>
                  <div class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 mt-4 d-block container-fluid" style="text-align: left;">
                    <h2 style="margin-top: 10%; text-align: center;"><strong>El libro de los libros</strong></h2>

                    <h4 style="text-align: left; margin-top: 10%;">Reseña del libro</h4>
                    <p style="text-align: justify; margin-top: 3%; ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                      <h3>Precio: <strong>$300</strong></h3>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                      <h3>Estado: <strong>Nuevo</strong></h3>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                      <span>Cantidad</span>
                      <select name="cantidadASumar" id="cantidadASumar">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <a href="carrito.html" class="btn btn-danger"><i class="fas fa-cart-plus"></i>Agregar al carro</a>
                      <a href="productos/accion/elLibroDeLosLibros.html" class="btn btn-primary">Mas detalles</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div >
</div >';
  var contenidoTotal ='';

  for (var i = 0; i < 4; i++){
    contenidoTotal = contenidoTotal + contenidoNuevo;
  }

  var contenedorMaestro = document.getElementById('contenedorMaestro');
  contenedorMaestro.innerHTML = contenedorMaestro.innerHTML + contenidoTotal;

  // Desplaza el Documento hasta el Botón
  var btnCargarMas = document.getElementById('btn-cargar-mas');
  btnCargarMas.scrollIntoView({behavior: "smooth"});

}
