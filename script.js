/// ---------- BANNER PRINCIPAL ----------
const filaImg = document.querySelector(".fila-img");
const slides = document.querySelectorAll(".fila-img .slide");
const anterior = document.querySelector(".flecha-img.izq");
const siguiente = document.querySelector(".flecha-img.der");

let indice = 0;

function mostrarBanner() {
    filaImg.style.transform = `translateX(-${indice * 100}%)`;
}

siguiente.addEventListener("click", function () {
    indice++;

    if (indice >= slides.length) {
        indice = 0;
    }

    mostrarBanner();
});

anterior.addEventListener("click", function () {
    indice--;

    if (indice < 0) {
        indice = slides.length - 1;
    }

    mostrarBanner();
});
// ---------- BÚSQUEDA ----------
const inputBuscar = document.getElementById("buscar");
const botonBuscar = document.getElementById("btn-buscar");

function buscarProductos() {
  const texto = inputBuscar.value.trim();
  if (texto === "") return;
  console.log("Buscando: " + texto);
}

botonBuscar.addEventListener("click", buscarProductos);
inputBuscar.addEventListener("keydown", function (e) {
  if (e.key === "Enter") buscarProductos();
});


// ---------- CARRUSELES DE PRODUCTOS ----------
document.querySelectorAll(".carrusel").forEach(function (carrusel) {
  const [flechaIzq, flechaDer] = carrusel.querySelectorAll(".flecha");
  const productos = carrusel.querySelector(".productos");

  // Distancia de un salto = ancho de una tarjeta + el espacio entre tarjetas
  function tamanoSalto() {
    const tarjeta = productos.firstElementChild;
    const gap = parseFloat(getComputedStyle(productos).columnGap) || 0;
    return tarjeta.offsetWidth + gap;
  }

  // Activa o desactiva las flechas según la posición actual
  function actualizarFlechas() {
    const maxScroll = productos.scrollWidth - productos.clientWidth;
    flechaIzq.disabled = productos.scrollLeft <= 1;
    flechaDer.disabled = productos.scrollLeft >= maxScroll - 1;
  }

  flechaIzq.addEventListener("click", function () {
    productos.scrollBy({ left: -tamanoSalto(), behavior: "smooth" });
  });
  flechaDer.addEventListener("click", function () {
    productos.scrollBy({ left: tamanoSalto(), behavior: "smooth" });
  });

  productos.addEventListener("scroll", actualizarFlechas);
  window.addEventListener("resize", actualizarFlechas);
  actualizarFlechas();

  if (carrusel.hasAttribute("data-auto") &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let pausado = false;
    carrusel.addEventListener("mouseenter", function () { pausado = true; });
    carrusel.addEventListener("mouseleave", function () { pausado = false; });
    setInterval(function () {
      if (pausado) return;
      if (flechaDer.disabled) productos.scrollTo({ left: 0, behavior: "smooth" });
      else flechaDer.click();
    }, 4000);
  }
});


// ---------- ARMA TU PC ----------
(function () {
  const selects = Array.from(document.querySelectorAll(".armador select"));
  if (selects.length === 0) return;

  const lista = document.getElementById("pc-lista");
  const totalEl = document.getElementById("pc-total");
  const estadoEl = document.getElementById("pc-estado");
  const btnAnadir = document.getElementById("pc-anadir");
  const btnReiniciar = document.getElementById("pc-reiniciar");
  const badge = document.getElementById("carrito-n");
  let enCarrito = 0;

  const dinero = function (n) {
    return "S/ " + n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  function dato(id) {
    const opcion = document.getElementById(id).selectedOptions[0];
    if (!opcion || !opcion.dataset.precio) return null;   // la opción "Elige una opción" no tiene precio
    return {
      nombre: opcion.textContent.trim(),
      precio: Number(opcion.dataset.precio),
      socket: opcion.dataset.socket,
      ddr: opcion.dataset.ddr,
      watts: Number(opcion.dataset.watts || 0)
    };
  }

  function mostrarEstado(clase, texto) {
    estadoEl.className = "armador-estado " + clase;
    estadoEl.textContent = texto;
  }

  function actualizar() {
    // Lista de piezas y total
    lista.innerHTML = "";
    let total = 0, elegidas = 0;
    selects.forEach(function (s) {
      const d = dato(s.id);
      const li = document.createElement("li");
      if (d) {
        total += d.precio;
        elegidas++;
        li.innerHTML = "<span></span><span></span>";
        li.children[0].textContent = d.nombre;
        li.children[1].textContent = dinero(d.precio);
      } else {
        li.className = "vacio";
        li.textContent = s.dataset.pieza + ": sin elegir";
      }
      lista.appendChild(li);
    });
    totalEl.textContent = dinero(total);

    // Compatibilidad
    const cpu = dato("pc-cpu"), placa = dato("pc-placa"), ram = dato("pc-ram");
    const gpu = dato("pc-gpu"), fuente = dato("pc-fuente");
    const errores = [];
    if (cpu && placa && cpu.socket !== placa.socket) {
      errores.push("El procesador (" + cpu.socket + ") no es compatible con la placa madre (" + placa.socket + ").");
    }
    if (placa && ram && placa.ddr !== ram.ddr) {
      errores.push("La placa madre usa " + placa.ddr + " y la memoria es " + ram.ddr + ".");
    }
    if (fuente && (cpu || gpu)) {
      const minimo = Math.ceil(((cpu ? cpu.watts : 0) + (gpu ? gpu.watts : 0) + 100) / 50) * 50;
      if (fuente.watts < minimo) {
        errores.push("La fuente de " + fuente.watts + "W es corta. Para estas piezas recomendamos al menos " + minimo + "W.");
      }
    }

    const faltan = selects.length - elegidas;
    if (errores.length > 0) mostrarEstado("error", errores.join(" "));
    else if (faltan > 0) mostrarEstado("espera", "Elige " + faltan + (faltan === 1 ? " pieza más." : " piezas más."));
    else mostrarEstado("ok", "Todo es compatible. Tu PC está lista.");

    btnAnadir.disabled = errores.length > 0 || faltan > 0;
  }

  selects.forEach(function (s) { s.addEventListener("change", actualizar); });

  btnReiniciar.addEventListener("click", function () {
    selects.forEach(function (s) { s.selectedIndex = 0; });
    actualizar();
  });

  btnAnadir.addEventListener("click", function () {
    enCarrito++;
    badge.textContent = enCarrito;
    badge.hidden = false;
    mostrarEstado("ok", "¡Configuración añadida al carrito!");
    setTimeout(actualizar, 2500);
  });

  actualizar();
})();


// ---------- CONTADORES ANIMADOS ----------
(function () {
  const numeros = document.querySelectorAll("[data-meta]");
  if (numeros.length === 0) return;
  const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animar(el) {
    const meta = Number(el.dataset.meta);
    const pre = el.dataset.prefijo || "";
    const suf = el.dataset.sufijo || "";
    const duracion = 1600;
    const inicio = performance.now();
    function paso(ahora) {
      const p = Math.min((ahora - inicio) / duracion, 1);
      const valor = Math.round(meta * (1 - Math.pow(1 - p, 3)));
      el.textContent = pre + valor.toLocaleString("es-PE") + suf;
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  if (reducir || !("IntersectionObserver" in window)) return;   // se queda con el valor final
  numeros.forEach(function (n) { n.textContent = (n.dataset.prefijo || "") + "0" + (n.dataset.sufijo || ""); });
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        animar(e.target);
        observador.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  numeros.forEach(function (n) { observador.observe(n); });
})();


// ---------- PREGUNTAS FRECUENTES  ----------
document.querySelectorAll(".faq-item").forEach(function (item) {
  const boton = item.querySelector(".faq-p");
  boton.addEventListener("click", function () {
    const estabaAbierta = item.classList.contains("abierta");
    document.querySelectorAll(".faq-item.abierta").forEach(function (otra) {
      otra.classList.remove("abierta");
      otra.querySelector(".faq-p").setAttribute("aria-expanded", "false");
    });
    if (!estabaAbierta) {
      item.classList.add("abierta");
      boton.setAttribute("aria-expanded", "true");
    }
  });
});


// ---------- SUSCRIPCIÓN ----------
(function () {
  const form = document.getElementById("form-suscripcion");
  if (!form) return;
  const input = document.getElementById("suscripcion-correo");
  const msj = document.getElementById("suscripcion-msj");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const correo = input.value.trim();
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo);
    input.classList.toggle("invalido", !valido);
    msj.className = "suscripcion-msj " + (valido ? "ok" : "error");
    msj.textContent = valido
      ? "¡Listo! Te escribiremos a " + correo + "."
      : "Escribe un correo válido, por ejemplo nombre@correo.com.";
    if (valido) form.reset();
  });
})();
