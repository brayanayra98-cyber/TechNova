// Lista de productos
const listaComponentes = [
    { img: 'img/IntelCore5.png', nombre: "INTEL CORE ULTRA 5", precio: 1220 },
    { img: 'img/TecladoGamer.png', nombre: "TECLADO GAMER DRAGON X", precio: 250 },
    { img: 'img/ramDDR4.png', nombre: "MEMORIA RAM XPG 16GB", precio: 570 },
    { img: 'img/mause.png', nombre: "MOUSE GAMER INALÁMBRICO", precio: 65 },
    { img: 'img/placamadreAMD.png', nombre: "PLACA AMD SOCKET AM4",  precio: 620 },
    { img: 'img/Ryzen5.png', nombre: "AMD RYZEN 5 5500", precio: 500 },
    { img: 'img/Audifonos.png', nombre: "AUDÍFONOS GAMER MICRONICS AURMICYBENKVIB", precio: 150 },
    { img: 'img/placasmadre.png', nombre: "PLACA MADRE MSI B250 GAMING M3", precio: 1550 },
    { img: 'img/Asrock_h610M-HDM.png', nombre: "PLACA ASROCK H610M-HDM", precio: 352 },
    { img: 'img/Ssd_5000gb_Westwrn_SA510.png', nombre: "SSD 5000GB WESTWRN SA510", precio: 230 },
    { img: 'img/Ssd_WD_Greem_1tb.png', nombre: "SSD_WD_GREEN 1TB", categoria: "SSD", precio: 530 },
    { img: 'img/Intel_coore_9i-k270.png', nombre: "INTEL CORE 9i K270", precio: 2600 },
    { img: 'img/Intel_core_7i-12700k.png', nombre: "INTEL CORE 7i 1270K", precio: 1330 },
    { img: 'img/RAIZEN_7_57000G.png', nombre: "RAIZEN 7 5700G", precio: 990 },
    { img: 'img/RAIZEN_9_5950_AM4.png', nombre: "RAIZEN 9 5950 AM4", categoria: "Procesadores", precio: 2130 },
    { img: 'img/FURY_24_GB__DDR4.png', nombre: "FURY 24 GB DDR4", precio: 685 },
    { img: 'img/HXSJ_NEW_3200DPI_BUTTONS_7_COLOR.png', nombre: "MOUSE NEW 3200 BUTTONS 7 COLOR", precio: 75 },
    { img: 'img/MAUS_PAD_RGB_BLAZZE_TINY.png', nombre: "MOUSEPAD RGB BLAZZE TINY", precio: 50 },
    { img: 'img/XPG_D20_16GB_DDR4__3200MHZ.png', nombre: "XPG D20 16GB DDR4 3200MHZ", precio: 720 },
    { img: 'img/WD_Red_SA500_NAS_SATA_SSD_M.2_2280_-_500GB.png', nombre: "W A500 SATA SSD M2280 500GB", precio: 820 }
];

// const contenedor = document.getElementById('contenedor_componentes');
// // Crea las targetas en html
// function mostrarComponentes(productos) {
//     let html = "";

//     productos.forEach(prod => {
//         html += `
//             <div class="tarjeta-componente">
//                 <div class="tarjeta-img">
//                     <img src="${prod.img}" alt="${prod.nombre}">
//                 </div>
//                 <p class="tarjeta-titulo">${prod.nombre}</p>
//                 <div class="tarjeta-pie">
//                     <span class="tarjeta-precio">S/ ${prod.precio}</span>
//                     <button class="btn-carrito">
//                         Añadir al carrito
//                         <i class="fa-solid fa-cart-shopping"></i>
//                         <i class="bi bi-cart"></i>
//                     </button>
//                 </div>
//             </div>
//         `;
//     });

//     contenedor.innerHTML = html;
// }
// mostrarComponentes(listaComponentes);






// const listaComponentes = [
//     { img: 'img/placa_asus.png', nombre: "PLACA INTEL ASUS PRIME H510M-R R2.0 DDR4 LGA 1200", precio: 500 },
//     { img: 'img/procesador_i3.png', nombre: "PROCESADOR INTEL CORE I3 10105F 3.7GHZ 6MB LGA 1200", precio: 320 },
//     { img: 'img/ssd_kingston.png', nombre: "SSD M.2 KINGSTON NV3 1TB NVME", precio: 500 },
//     { img: 'img/ram_corsair.png', nombre: "MEMORIA DDR5 CORSAIR 16GB 5600MHZ VENGEANCE RGB", precio: 1000 },
//     { img: 'img/fuente_antryx.png', nombre: "FUENTE 500W ANTRYX B500W ATX V3", precio: 120 },
//     { img: 'img/teclado_razer.png', nombre: "TECLADO GAMING RAZER BLACKWIDOW V4 SWITCH GREEN RGB", precio: 675 }
// ];

const contenedor = document.getElementById('contenedor_componentes');
const inputBusqueda = document.getElementById('buscar'); // 1. Capturamos el buscador

function mostrarComponentes(productos) {
    // Mensaje por si no hay coincidencias
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
            <div class="tarjeta-componente">
                <div class="tarjeta-img">
                    <img src="${prod.img}" alt="${prod.nombre}">
                </div>
                <p class="tarjeta-titulo">${prod.nombre}</p>
                <div class="tarjeta-pie">
                    <span class="tarjeta-precio">S/ ${prod.precio}</span>
                    <button class="btn-carrito">
                        Añadir al carrito
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

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
