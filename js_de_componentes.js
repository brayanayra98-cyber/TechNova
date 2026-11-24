// Lista de productos
const listaComponentes = [
  { id: 1, img: "img/IntelCore5.png", nombre: "INTEL CORE ULTRA 5", precio: 1220 },
  { id: 2, img: "img/TecladoGamer.png", nombre: "TECLADO GAMER DRAGON X", precio: 250 },
  { id: 3, img: "img/ramDDR4.png", nombre: "MEMORIA RAM XPG 16GB", precio: 570 },
  { id: 4, img: "img/mause.png", nombre: "MOUSE GAMER INALÁMBRICO", precio: 65 },
  { id: 5, img: "img/placamadreAMD.png", nombre: "PLACA AMD SOCKET AM4", precio: 620 },
  { id: 6, img: "img/Ryzen5.png", nombre: "AMD RYZEN 5 5500", precio: 500 },
  { id: 7, img: "img/Audifonos.png", nombre: "AUDÍFONOS GAMER MICRONICS AURMICYBENKVIB", precio: 150 },
  { id: 8, img: "img/placasmadre.png", nombre: "PLACA MADRE MSI B250 GAMING M3", precio: 1550 },
  { id: 9, img: "img/Asrock_h610M-HDM.png", nombre: "PLACA ASROCK H610M-HDM", precio: 352 },
  { id: 10, img: "img/Ssd_5000gb_Westwrn_SA510.png", nombre: "SSD 5000GB WESTWRN SA510", precio: 230 },
  { id: 11, img: "img/Ssd_WD_Greem_1tb.png", nombre: "SSD_WD_GREEN 1TB", categoria: "SSD", precio: 530 },
  { id: 12, img: "img/Intel_coore_9i-k270.png", nombre: "INTEL CORE 9i K270", precio: 2600 },
  { id: 13, img: "img/Intel_core_7i-12700k.png", nombre: "INTEL CORE 7i 1270K", precio: 1330 },
  { id: 14, img: "img/RAIZEN_7_57000G.png", nombre: "RAIZEN 7 5700G", precio: 990 },
  { id: 15, img: "img/RAIZEN_9_5950_AM4.png", nombre: "RAIZEN 9 5950 AM4", categoria: "Procesadores", precio: 2130 },
  { id: 16, img: "img/FURY_24_GB__DDR4.png", nombre: "FURY 24 GB DDR4", precio: 685 },
  { id: 17, img: "img/HXSJ_NEW_3200DPI_BUTTONS_7_COLOR.png", nombre: "MOUSE NEW 3200 BUTTONS 7 COLOR", precio: 75 },
  { id: 18, img: "img/MAUS_PAD_RGB_BLAZZE_TINY.png", nombre: "MOUSEPAD RGB BLAZZE TINY", precio: 50 },
  { id: 19, img: "img/XPG_D20_16GB_DDR4__3200MHZ.png", nombre: "XPG D20 16GB DDR4 3200MHZ", precio: 720 },
  { id: 20, img: "img/WD_Red_SA500_NAS_SATA_SSD_M.2_2280_-_500GB.png", nombre: "W A500 SATA SSD M2280 500GB", precio: 820 }
];

// CREA LAS TARJETAS
const contenedor = document.getElementById("contenedor_componentes");
const inputBusqueda = document.getElementById("buscar");

function mostrarComponentes(productos) {
  if (productos.length === 0) {
    contenedor.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center; font-size: 18px; padding: 40px;">
        No se encontraron componentes con ese nombre.
      </p>`;
    return;
  }

  let html = "";
  productos.forEach(prod => {
    html += `
      <a class="tarjeta-componente producto_tarjeta" href="detalle-producto.html?id=${prod.id}">
        <div class="tarjeta-img">
          <img src="${prod.img}" alt="${prod.nombre}">
        </div>
        <p class="tarjeta-titulo">${prod.nombre}</p>
        <div class="tarjeta-pie">
          <span class="tarjeta-precio">S/ ${prod.precio}</span>
          <button class="btn-carrito">
            Añadir al carrito <i class="bi bi-cart"></i>
          </button>
        </div>
      </a>`;
  });

  contenedor.innerHTML = html;
}

// Mostrar todos los productos al cargar
mostrarComponentes(listaComponentes);

// Filtrar al escribir en el buscador
inputBusqueda.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = listaComponentes.filter(prod => 
    prod.nombre.toLowerCase().includes(texto)
  );
  mostrarComponentes(filtrados);
});

// 2. Función que filtra mientras escribes
inputBusqueda.addEventListener('input', () => {
    const texto = inputBusqueda.value.trim().toLowerCase();
    
    const filtrados = listaComponentes.filter(prod => 
        prod.nombre.toLowerCase().includes(texto)
    );

    mostrarComponentes(filtrados);
});

// Cargar todos al inicio
mostrarComponentes(listaComponentes);
