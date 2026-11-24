document.addEventListener('click', function(evento) {
  // Caso A: Si le dan a "Añadir al carrito" en el Armador de PC de index.html
  if (evento.target.id === 'pc-anadir' || evento.target.closest('#pc-anadir')) {
    const totalEl = document.getElementById('pc-total');
    if (totalEl) {
      const precioTexto = totalEl.innerText.replace(/[^0-9.]/g, '');
      const precio = parseFloat(precioTexto) || 0;
      if (precio > 0) {
        agregarAlCarrito('PC Gamer Personalizada (Configuración completa)', precio, 'img/technova_logo_5.png');
      }
    }
    return;
  }

  // Caso B: Si le dan a "Añadir al carrito" en Componentes, Descuentos o Carrusel
  const boton = evento.target.closest('.btn-carrito') || evento.target.closest('button');
  if (!boton) return;

  const textoBoton = boton.innerText.toLowerCase();
  if (textoBoton.includes('añadir al carrito') || textoBoton.includes('agregar al carrito')) {
    evento.preventDefault();
    evento.stopPropagation();

    const tarjeta = boton.closest('.tarjeta-componente') || boton.closest('.producto_tarjeta') || boton.closest('.producto') || boton.parentElement.parentElement;
    if (!tarjeta) return;

    const tituloEl = tarjeta.querySelector('.tarjeta-titulo, h3, h4, p');
    const precioEl = tarjeta.querySelector('.tarjeta-precio, .precio');
    const imgEl = tarjeta.querySelector('img');

    const nombre = tituloEl ? tituloEl.innerText.trim() : 'Componente TechNova';
    const precioTexto = precioEl ? precioEl.innerText.replace(/[^0-9.]/g, '') : '0';
    const precio = parseFloat(precioTexto) || 0;
    const imagen = imgEl ? imgEl.getAttribute('src') : 'img/technova_logo_5.png';

    if (precio > 0) {
      agregarAlCarrito(nombre, precio, imagen);
    }
  }
});

// ==========================================
// 2. GUARDAR Y ACTUALIZAR CONTADOR (#carrito-n)
// ==========================================
function agregarAlCarrito(nombre, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem('carritoTechnova')) || [];
  let productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      imagen: imagen,
      cantidad: 1
    });
  }

  localStorage.setItem('carritoTechnova', JSON.stringify(carrito));
  actualizarContadorMenu();
  alert(`¡${nombre} se agregó a tu carrito!`);
}

function actualizarContadorMenu() {
  let carrito = JSON.parse(localStorage.getItem('carritoTechnova')) || [];
  const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const contadorEl = document.getElementById('carrito-n');
  if (contadorEl) {
    contadorEl.innerText = totalItems;
    contadorEl.hidden = totalItems === 0;
  }
}

// ==========================================
// 3. LÓGICA DE CARRITO.HTML
// ==========================================
function renderizarCarrito() {
  const contenedor = document.getElementById('contenedor-productos');
  if (!contenedor) return;

  let carrito = JSON.parse(localStorage.getItem('carritoTechnova')) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="carrito-vacio">
        <h3>Tu carrito está vacío 🛒</h3>
        <p style="margin: 10px 0 20px;">Ve a Componentes o Descuentos para elegir productos.</p>
        <a href="Componentes.html" class="btn-rojo" style="text-decoration:none; display:inline-block;">Ir a ver Componentes</a>
      </div>
    `;
    actualizarResumen(carrito);
    return;
  }

  contenedor.innerHTML = '';
  carrito.forEach((producto, index) => {
    const subtotalItem = producto.precio * producto.cantidad;
    contenedor.innerHTML += `
      <div class="producto-item">
        <div class="info-prod">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="img-prod" onerror="this.src='img/technova_logo_5.png'">
          <div>
            <h3>${producto.nombre}</h3>
            <p>S/ ${producto.precio.toFixed(2)}</p>
            <p class="stock">EN STOCK</p>
          </div>
        </div>
        <div class="controles-cantidad">
          <button onclick="cambiarCantidad(${index}, -1)">-</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
        </div>
        <div style="font-size: 1.3rem; font-weight: bold;">S/ ${subtotalItem.toFixed(2)}</div>
        <button class="btn-eliminar" onclick="eliminarProducto(${index})"><i class="bi bi-trash"></i></button>
      </div>
    `;
  });

  actualizarResumen(carrito);
}

function cambiarCantidad(index, cambio) {
  let carrito = JSON.parse(localStorage.getItem('carritoTechnova')) || [];
  if (carrito[index].cantidad + cambio >= 1) {
    carrito[index].cantidad += cambio;
    localStorage.setItem('carritoTechnova', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorMenu();
  }
}

function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem('carritoTechnova')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carritoTechnova', JSON.stringify(carrito));
  renderizarCarrito();
  actualizarContadorMenu();
}

function actualizarResumen(carrito) {
  let subtotal = 0;
  let totalProductos = 0;

  carrito.forEach(item => {
    subtotal += item.precio * item.cantidad;
    totalProductos += item.cantidad;
  });

  const descuento = subtotal > 500 ? 250 : 0;
  const total = subtotal - descuento;

  document.getElementById('texto-cantidad').innerText = `Subtotal (${totalProductos} productos)`;
  document.getElementById('subtotal-general').innerText = `S/ ${subtotal.toFixed(2)}`;
  document.getElementById('descuento').innerText = `- S/ ${descuento.toFixed(2)}`;
  document.getElementById('total-pagar').innerText = `S/ ${total.toFixed(2)}`;
}

function finalizarCompra() {
  let carrito = JSON.parse(localStorage.getItem('carritoTechnova')) || [];
  if (carrito.length === 0) {
    alert('Agrega al menos un producto antes de finalizar.');
    return;
  }
  alert('¡Gracias por tu compra en Technova!');
  localStorage.removeItem('carritoTechnova');
  renderizarCarrito();
  actualizarContadorMenu();
}

// ==========================================
// 4. LÓGICA DE CONTACTO.HTML
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();
  actualizarContadorMenu();

  const formContacto = document.getElementById('form-contacto');
  if (formContacto) {
    formContacto.addEventListener('submit', function(evento) {
      evento.preventDefault();
      const nombre = document.getElementById('nombres').value;
      alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado al equipo de Technova.`);
      this.reset();
    });
  }
});
