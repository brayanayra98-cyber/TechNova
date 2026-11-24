// Lista de productos
const listadeProductos = [
    { descuento: '-20%', img: 'img/IntelCore5.png', nombre: "INTEL CORE ULTRA 7", categoria: "Procesadores", precio: 1520 },
    { descuento: '-15%', img: 'img/TecladoGamer.png', nombre: "TECLADO GAMER DRAGON X", categoria: "Accesorios", precio: 250 },
    { descuento: '-10%', img: 'img/ramDDR4.png', nombre: "MEMORIA RAM XPG 16Gb", categoria: "Memorias", precio: 570 },
    { descuento: '-5%', img: 'img/mause.png', nombre: "MOUSE GAMER INALÁMBRICO", categoria: "Accesorios", precio: 65 },
    { descuento: '-35%', img: 'img/placamadreAMD.png', nombre: "PLACAS AMD SOCKET AM4", categoria: "Placas madre", precio: 620 },
    { descuento: '-15%', img: 'img/Ryzen5.png', nombre: "AMD RYZEN 5 5500", categoria: "Procesadores", precio: 500 },
    { descuento: '-20%', img: 'img/Audifonos.png', nombre: "AUDÍFONOS GAMER MICRONICS AURMICYBENKVIB", categoria: "Accesorios", precio: 150 },
    { descuento: '-10%', img: 'img/placasmadre.png', nombre: "PLACA MADRE MSI B250 GAMING M3", categoria: "Placas madre", precio: 1550 },
    { descuento: '-37%', img: 'img/Asrock_h610M-HDM.png', nombre: "PLACA ASROCK H610M-HDM", categoria: "Placas madre", precio: 352 },
    { descuento: '-30%', img: 'img/Ssd_5000gb_Westwrn_SA510.png', nombre: "SSD 5000GB WESTWRN SA510", categoria: "SSD", precio: 230 },
    { descuento: '-17%', img: 'img/Ssd_WD_Greem_1tb.png', nombre: "SSD WD GREEN 1TB", categoria: "SSD", precio: 530 },
    { descuento: '-20%', img: 'img/Intel_coore_9i-k270.png', nombre: "INTEL CORE 9i K270", categoria: "Procesadores", precio: 2600 },
    { descuento: '-15%', img: 'img/Intel_core_7i-12700k.png', nombre: "INTEL CORE 7i 1270K", categoria: "Procesadores", precio: 1330 },
    { descuento: '-10%', img: 'img/RAIZEN_7_57000G.png', nombre: "RAIZEN 7 5700G", categoria: "Procesadores", precio: 990 },
    { descuento: '-10%', img: 'img/RAIZEN_9_5950_AM4.png', nombre: "RAIZEN 9 5950 AM4", categoria: "Procesadores", precio: 2130 },
    { descuento: '-17%', img: 'img/FURY_24_GB__DDR4.png', nombre: "FURY 24 GB DDR4", categoria: "Memorias", precio: 685 },
    { descuento: '-5%', img: 'img/HXSJ_NEW_3200DPI_BUTTONS_7_COLOR.png', nombre: "MOUSE NEW 3200 BUTTONS 7 COLOR", categoria: "Accesorios", precio: 75 },
    { descuento: '-5%', img: 'img/MAUS_PAD_RGB_BLAZZE_TINY.png', nombre: "MOUSEPAD RGB BLAZZE TINY", categoria: "Accesorios", precio: 50 },
    { descuento: '-10%', img: 'img/XPG_D20_16GB_DDR4__3200MHZ.png', nombre: "XPG D20 16GB DDR4 3200MHZ", categoria: "Memorias", precio: 720 },
    { descuento: '-15%', img: 'img/WD_Red_SA500_NAS_SATA_SSD_M.2_2280_-_500GB.png', nombre: "W A500 SATA SSD M2280 500GB", categoria: "Memorias", precio: 820 }
];

// Elementos HTML
const slider = document.getElementById('desl1');
const precioMaxActual = document.getElementById('precio_max_visible');
const grid = document.getElementById('contenedor_productos');
const checkboxes = document.querySelectorAll('.filtro-categoria');
const inputBusqueda = document.getElementById('buscar');

// Mostrar productos
function renderizarProductos(productos) {

    if (productos.length === 0) {
        grid.innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center;">
                No se encontraron productos con estos filtros.
            </p>`;
        return;
    }

    let estructuraHtml = "";

    productos.forEach(producto => {
        const porcentaje = Math.abs(parseInt(producto.descuento)) || 20;
        const precioOriginal = producto.precio / (1 - (porcentaje / 100));
        estructuraHtml += `
            <div class="producto_tarjeta">
                <span class="descuento_tag">${producto.descuento}</span>
                <img src="${producto.img}" alt="${producto.nombre}">
                <div class="producto_nombre">${producto.nombre}</div>
                <div style="width: 100%; text-align: left;">
                        <span class="precio_actual">S/ ${producto.precio.toFixed(2)}</span>
                        <span class="precio_tachado">S/ ${precioOriginal.toFixed(2)}</span>
                    <p class='texto_oferta'>¡Oferta online!</p>
                </div>
            </div>`;
    });

    grid.innerHTML = estructuraHtml;
}

// Aplicar filtros
function aplicarFiltros() {

    const precioMaximo = Number(slider.value);
    const textoBuscado = inputBusqueda.value.trim().toLowerCase();

    const categoriasSeleccionadas = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value.toLowerCase());

    const productosFiltrados = listadeProductos.filter(producto => {

        const cumplePrecio = producto.precio <= precioMaximo;

        const categoriaNormalizada =
            producto.categoria.toLowerCase().replaceAll(" ", "");

        const cumpleCategoria =
            categoriasSeleccionadas.length === 0 ||
            categoriasSeleccionadas.includes(categoriaNormalizada);

        const cumpleTexto =
            producto.nombre.toLowerCase().includes(textoBuscado) ||
            producto.categoria.toLowerCase().includes(textoBuscado);

        return cumplePrecio && cumpleCategoria && cumpleTexto;
    });

    renderizarProductos(productosFiltrados);
}

// Eventos
slider.addEventListener('input', () => {
    precioMaxActual.textContent = `S/ ${slider.value}`;
    aplicarFiltros();
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', aplicarFiltros);
});

inputBusqueda.addEventListener('input', aplicarFiltros);

// Mostrar productos al iniciar
renderizarProductos(listadeProductos);
