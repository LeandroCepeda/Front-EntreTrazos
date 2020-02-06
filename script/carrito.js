// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Gracias por comprar en EntreTrazos!')

    let cartTitles = document.querySelector('.cart-items').getElementsByClassName('cart-item-title')
    let cartUnitPrice = document.querySelector('.cart-items').getElementsByClassName('cart-price')
    let totalCart = document.querySelector('.cart-total-price').innerText.replace('$','');
    let titulos = [];
    let preciosUnitarios = [];
    let currentDate = new Date();
    let dateTime = "" + currentDate.getDate() + "/"
    + (currentDate.getMonth()+1)  + "/" 
    + currentDate.getFullYear() + " "  
    + currentDate.getHours() + ":"  
    + currentDate.getMinutes() + ":" 
    + currentDate.getSeconds();


    for (let i = 0; i < cartTitles.length; i++) {
        let titulo = cartTitles[i].innerHTML;
        titulos.push(titulo);
    }
    for(let i = 0; i < cartUnitPrice.length; i++) {
        let precio = cartUnitPrice[i].innerHTML
        preciosUnitarios.push(precio);
    }

    //FETCH PARA REALIZAR EL POST DE LA COMPRA
    //ARMA UN JSON QUE SE VA A CREAR CON TITULOS COMO ELEMENTOS HAYA EN EL CARRITO.
    let jsonDetalle = '[';
    for(let i = 0; i<titulos.length; i++) {
        jsonDetalle += `{
            "precioUnitario": "${preciosUnitarios[i]}",
    		"libro": {
    			"titulo": "${titulos[i]}"
    		}
        }`
        if(i < (titulos.length -1)) {
            jsonDetalle +=',';
        } else {
            jsonDetalle += ']}'
        }
    };

    console.log(jsonDetalle); //para ver como me armo la consulta

    var url = 'http://localhost:8080/api/compra/';
    var data = `{
        "fecha": "${dateTime}",
        "total": "${totalCart}",
        "detalles":`;
    data += jsonDetalle;
    console.log(data);

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: data, // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));


    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    alert('Producto agregado al carrito');
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText.replace('$','')
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" disabled type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}