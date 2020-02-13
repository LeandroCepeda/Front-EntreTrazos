//REGISTRAR USUARIO
const $form = document.querySelector('#formulario-registro');
$form.onsubmit = validarFormulario;


function validarNombre(nombre) {
    if (nombre.length === 0) {
        return 'El campo nombre tener al menos un caracter';
    }

    if (nombre.length >= 50) {
        return 'El campo nombre debe tener menos de 50 caracteres';
    }

    if (!/^[a-z]+$/i.test(nombre)) {
        return 'El campo nombre solo acepta letras';
    }

    return '';
}

function validarApellido(nombre) {
    if (nombre.length === 0) {
        return 'El campo apellido debe tener al menos un caracter';
    }

    if (nombre.length >= 50) {
        return 'El campo apellido debe tener menos de 50 caracteres';
    }

    if (!/^[a-z]+$/i.test(nombre)) {
        return 'El campo apellido solo acepta letras';
    }

    return '';
}

function validarEmail(email) {
    if (email.length === 0) {
        return "El campo email no puede estar vacío"
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        return 'El campo email es incorrecto';
    }

    return '';

}

function validarFechaNacimiento(fechaNacimiento) {
    if (!/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(fechaNacimiento)) {
        return 'La fecha de nacimiento debe tener el formato DD/MM/AAAA'
    }

    return '';
}

function validarContraseña(contraseña) {
    if (contraseña.length < 8) {
        return "La contraseña debe tener 8 caracteres como mínimo";
    }
    if (!/^[a-zA-Z0-9]+$/.test(contraseña)) {
        return 'La contraseña solo puede tener numeros y letras';
    }

    return '';
}


function validarFormulario(event) {

    const nombre = $form.nombre.value;
    const apellido = $form.apellido.value;
    const email = $form.email.value;
    const fechaNacimiento = $form['fecha-nacimiento'].value;
    const contraseña = $form.contraseña.value;

    const errorNombre = validarNombre(nombre);
    const errorApellido = validarApellido(apellido);
    const errorEmail = validarEmail(email);
    const errorFechaNacimiento = validarFechaNacimiento(fechaNacimiento);
    const errorContraseña = validarContraseña(contraseña);
    event.preventDefault();

    const errores = {
        nombre: errorNombre,
        apellido: errorApellido,
        email: errorEmail,
        "fecha-nacimiento": errorFechaNacimiento,
        contraseña: errorContraseña
    };

    const esExito = (manejarErrores(errores) === 0);

    const $errorPeticion = document.querySelector("#error-peticion");
    $errorPeticion.innerHTML = "";

    if (esExito) {
        const $exito = document.querySelector('#exito');
        const $inputs = document.querySelectorAll(".form-control");


        let url = 'http://localhost:8080/api/usuario/';
        var data = {
            nombre: `${nombre}`,
            apellido: `${apellido}`,
            fechaNacimiento: `${fechaNacimiento}`,
            email: `${email}`,
            password: `${contraseña}`
        };

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 409) {
                const $errorMensaje = document.createElement('p');

                $errorPeticion.className = ""; //muestro el div con id "error-peticion"
                $form.email.classList.add("error"); //agrego al input email un borde rojo
                $errorMensaje.className = "error-texto"; // parrafo de color rojo
                $errorMensaje.innerText = "Ya existe un usuario con ese correo electronico";
                $errorPeticion.appendChild($errorMensaje); //agrego parrafo al div de errores
            } else {
                $exito.className = "";
                $inputs.forEach(function (input) {
                    input.disabled = true;
                })
                setTimeout(function () { location.href = "home.html" }, 3000);
            }
        })
    }
}

function manejarErrores(errores) {
    const keys = Object.keys(errores);
    const $errores = document.querySelector('#errores');
    let cantidadErrores = 0;

    $errores.innerHTML = "";

    keys.forEach(function (key) {
        const error = errores[key];

        if (error) {
            cantidadErrores++;
            $form[key].classList.add("error");
            const $error = document.createElement('li');
            $error.innerText = error;
            $error.className = "error-texto";
            $errores.appendChild($error);
        } else {
            $form[key].className = "form-control";
        }
    })

    return cantidadErrores;
}



