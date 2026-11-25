// ---------- 1. BUSCADOR ----------
const cajaBuscar = document.getElementById("buscar");
const botonBuscar = document.getElementById("btn-buscar");
const todosLosProductos = document.querySelectorAll(".producto_vendido");

function buscarProductos() {
  const texto = cajaBuscar.value.toLowerCase();

  for (let i = 0; i < todosLosProductos.length; i++) {
    const nombre = todosLosProductos[i].querySelector(".producto-nombre").textContent.toLowerCase();

    if (nombre.includes(texto)) {
      todosLosProductos[i].hidden = false;  
    } else {
      todosLosProductos[i].hidden = true;  
    }
  }
}

botonBuscar.addEventListener("click", buscarProductos);  
cajaBuscar.addEventListener("keyup", buscarProductos);   


// ---------- 2. FLECHAS DE LOS CARRUSELES ----------
const carruseles = document.querySelectorAll(".carrusel");

for (let i = 0; i < carruseles.length; i++) {
  const flechas = carruseles[i].querySelectorAll(".flecha");
  const flechaIzquierda = flechas[0];
  const flechaDerecha = flechas[1];
  const fila = carruseles[i].querySelector(".productos");

  const salto = 250;  

  flechaIzquierda.addEventListener("click", function () {
    fila.scrollLeft = fila.scrollLeft - salto;
  });

  flechaDerecha.addEventListener("click", function () {
    fila.scrollLeft = fila.scrollLeft + salto;
  });
}


// ---------- 3. ARMA TU PC ----------
const listas = document.querySelectorAll(".armador select");
const resumen = document.getElementById("pc-lista");
const textoTotal = document.getElementById("pc-total");
const textoEstado = document.getElementById("pc-estado");
const botonAnadir = document.getElementById("pc-anadir");
const botonReiniciar = document.getElementById("pc-reiniciar");
const numeroCarrito = document.getElementById("carrito-n");

let enCarrito = 0;   
function dinero(numero) {
  return "S/ " + numero.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function datosDe(id) {
  const lista = document.getElementById(id);

  if (lista.selectedIndex === 0) {  
    return null;
  }
  const opcion = lista.options[lista.selectedIndex];
  return {
    nombre: opcion.textContent,
    precio: Number(opcion.getAttribute("data-precio")),
    socket: opcion.getAttribute("data-socket"),
    ddr: opcion.getAttribute("data-ddr"),
    watts: Number(opcion.getAttribute("data-watts"))
  };
}

function mostrarEstado(clase, texto) {
  textoEstado.className = "armador-estado " + clase;
  textoEstado.textContent = texto;
}

function actualizar() {

  resumen.innerHTML = "";
  let total = 0;
  let elegidas = 0;

  for (let i = 0; i < listas.length; i++) {
    const pieza = datosDe(listas[i].id);
    const fila = document.createElement("li");

    if (pieza === null) {
      fila.className = "vacio";
      fila.textContent = listas[i].getAttribute("data-pieza") + ": sin elegir";
    } else {
      total = total + pieza.precio;
      elegidas = elegidas + 1;
      fila.innerHTML = "<span>" + pieza.nombre + "</span><span>" + dinero(pieza.precio) + "</span>";
    }

    resumen.appendChild(fila);
  }

  textoTotal.textContent = dinero(total);
  const cpu = datosDe("pc-cpu");
  const placa = datosDe("pc-placa");
  const ram = datosDe("pc-ram");
  const gpu = datosDe("pc-gpu");
  const fuente = datosDe("pc-fuente");

  let errores = "";   
  if (cpu !== null && placa !== null && cpu.socket !== placa.socket) {
    errores = errores + "El procesador (" + cpu.socket + ") no es compatible con la placa madre (" + placa.socket + "). ";
  }

  if (placa !== null && ram !== null && placa.ddr !== ram.ddr) {
    errores = errores + "La placa madre usa " + placa.ddr + " y la memoria es " + ram.ddr + ". ";
  }

  if (fuente !== null && (cpu !== null || gpu !== null)) {
    let consumo = 100; 
    if (cpu !== null) {
      consumo = consumo + cpu.watts;
    }
    if (gpu !== null) {
      consumo = consumo + gpu.watts;
    }
    const minimo = Math.ceil(consumo / 50) * 50; 

    if (fuente.watts < minimo) {
      errores = errores + "La fuente de " + fuente.watts + "W es corta. Para estas piezas recomendamos al menos " + minimo + "W. ";
    }
  }

  const faltan = listas.length - elegidas;

  if (errores !== "") {
    mostrarEstado("error", errores);
  } else if (faltan === 1) {
    mostrarEstado("espera", "Elige 1 pieza más.");
  } else if (faltan > 1) {
    mostrarEstado("espera", "Elige " + faltan + " piezas más.");
  } else {
    mostrarEstado("ok", "Todo es compatible. Tu PC está lista.");
  }

  botonAnadir.disabled = (errores !== "" || faltan > 0);
}

for (let i = 0; i < listas.length; i++) {
  listas[i].addEventListener("change", actualizar);
}

botonReiniciar.addEventListener("click", function () {
  for (let i = 0; i < listas.length; i++) {
    listas[i].selectedIndex = 0;
  }
  actualizar();
});

botonAnadir.addEventListener("click", function () {
  enCarrito = enCarrito + 1;
  numeroCarrito.textContent = enCarrito;
  numeroCarrito.hidden = false;
  mostrarEstado("ok", "¡Configuración añadida al carrito!");
  setTimeout(actualizar, 2500);   
});
actualizar(); 


// ---------- 4. SUSCRIPCIÓN ----------
const formulario = document.getElementById("form-suscripcion");
const campoCorreo = document.getElementById("suscripcion-correo");
const mensajeSuscripcion = document.getElementById("suscripcion-msj");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   
  const correo = campoCorreo.value.trim();   
  const posicionArroba = correo.indexOf("@");
  const posicionPunto = correo.lastIndexOf(".");
  const esValido = posicionArroba > 0 && posicionPunto > posicionArroba + 1 && posicionPunto < correo.length - 1;

  if (esValido) {
    campoCorreo.classList.remove("invalido");
    mensajeSuscripcion.className = "suscripcion-msj ok";
    mensajeSuscripcion.textContent = "¡Listo! Te escribiremos a " + correo + ".";
    formulario.reset();
  } else {
    campoCorreo.classList.add("invalido");
    mensajeSuscripcion.className = "suscripcion-msj error";
    mensajeSuscripcion.textContent = "Escribe un correo válido, por ejemplo nombre@correo.com.";
  }
});
