// Datos de ejemplo — en el futuro vendrán de una base de datos real
const restaurantes = [
  {
    nombre: "La Pepita",
    emoji: "🥑",
    tipo: ["Brunch", "Cafeterías"],
    valoracion: 4.8,
    numValoraciones: 342,
    ciudad: "Madrid",
    barrio: "Malasaña",
    direccion: "Calle Ballesta, 12",
    horario: "Lun–Vie 9:00–17:00 · Sáb–Dom 10:00–18:00",
    descripcion: "Cafeterías de especialidad con brunch todo el día. Carta de temporada con ingredientes de proximidad y el mejor aguacate de Malasaña.",
    porQueIr: "El brunch más instagrameable de Madrid sin colas eternas.",
    precioMedio: 14,
    precio: 2,
    precioMax: 4,
  },
  {
    nombre: "Yakitori Taro",
    emoji: "🍱",
    tipo: ["Japonesa", "Restaurantes"],
    valoracion: 4.6,
    numValoraciones: 218,
    ciudad: "Madrid",
    barrio: "Lavapiés",
    direccion: "Calle Argumosa, 7",
    horario: "Mar–Dom 13:30–15:30 · 20:30–23:30",
    descripcion: "Pequeño restaurante japonés de barrio. Especialidad en yakitori a la brasa y ramen casero. Solo 20 plazas.",
    porQueIr: "Yakitori auténtico a precio de barrio. Reserva con antelación.",
    precioMedio: 22,
    precio: 2,
    precioMax: 4,
  },
  {
    nombre: "Zezeo",
    emoji: "🍺",
    tipo: ["Tapas", "Bares"],
    valoracion: 4.5,
    numValoraciones: 511,
    ciudad: "Sevilla",
    barrio: "Utrera",
    direccion: "Plaza Mayor, 3",
    horario: "Todos los días 11:00–00:00",
    descripcion: "Bar de toda la vida con las mejores tapas de la zona. Especialidad en pringá, caracoles y montaditos.",
    porQueIr: "Tapa gratis con cada caña. El sitio donde comen los locales.",
    precioMedio: 10,
    precio: 1,
    precioMax: 4,
  },
  {
    nombre: "Toto Pizza",
    emoji: "🍕",
    tipo: ["Italiana", "Restaurantes"],
    valoracion: 4.7,
    numValoraciones: 189,
    ciudad: "Barcelona",
    barrio: "Gràcia",
    direccion: "Carrer de Verdi, 24",
    horario: "Mar–Dom 13:00–16:00 · 20:00–23:30",
    descripcion: "Pizzería napolitana con horno de leña importado de Italia. Masa de fermentación lenta de 48 horas y productos DOP.",
    porQueIr: "La pizza napolitana más honesta de Barcelona. Sin artificios.",
    precioMedio: 18,
    precio: 2,
    precioMax: 4,
  },
  {
    nombre: "Mar & Brasa",
    emoji: "🦞",
    tipo: ["Mediterránea", "Restaurantes"],
    valoracion: 4.9,
    numValoraciones: 97,
    ciudad: "Valencia",
    barrio: "El Carmen",
    direccion: "Calle dels Cavallers, 5",
    horario: "Mié–Lun 14:00–16:30 · 21:00–23:00",
    descripcion: "Restaurantes de cocina mediterránea de mercado. El chef trabaja con pescadores locales y cambia la carta cada semana según la lonja.",
    porQueIr: "El producto más fresco del Mediterráneo a dos pasos del centro histórico.",
    precioMedio: 45,
    precio: 3,
    precioMax: 4,
  },
  {
    nombre: "Café Colón",
    emoji: "☕",
    tipo: ["Cafeterías", "Brunch"],
    valoracion: 4.4,
    numValoraciones: 403,
    ciudad: "Madrid",
    barrio: "Retiro",
    direccion: "Calle de O'Donnell, 8",
    horario: "Lun–Dom 8:00–20:00",
    descripcion: "Cafeterías clásica madrileña con terraza interior. Conocida por sus churros con chocolate y su tostada con tomate.",
    porQueIr: "El desayuno madrileño de toda la vida, sin prisas y con buena terraza.",
    precioMedio: 8,
    precio: 1,
    precioMax: 4,
  },
];

// Genera los símbolos de precio (€ con los sobrantes en gris)
function renderPrecio(precio, precioMax) {
  let html = "";
  for (let i = 1; i <= precioMax; i++) {
    html += i <= precio ? "€" : `<span>€</span>`;
  }
  return html;
}

// Genera las estrellas de valoración
function renderEstrellas(valoracion) {
  return "★".repeat(Math.round(valoracion)) + "☆".repeat(5 - Math.round(valoracion));
}

// Crea el HTML de una tarjeta
function crearTarjeta(restaurante) {
  const tags = restaurante.tipo.map(t => `<span class="card__tag">${t}</span>`).join("");

  return `
    <article class="card">
      <div class="card__image">${restaurante.emoji}</div>
      <div class="card__body">
        <div class="card__header">
          <h3 class="card__name">${restaurante.nombre}</h3>
          <div class="card__rating">
            ★ ${restaurante.valoracion} <span style="color:#9ca3af;font-weight:400">(${restaurante.numValoraciones})</span>
          </div>
        </div>
        <div class="card__tags">${tags}</div>
        <div class="card__footer">
          <span class="card__location">📍 ${restaurante.barrio}, ${restaurante.ciudad}</span>
          <span class="card__price">${renderPrecio(restaurante.precio, restaurante.precioMax)}</span>
        </div>
      </div>
    </article>
  `;
}

// Renderiza todas las tarjetas en el grid
function renderizarTarjetas(lista) {
  const grid = document.getElementById("cards-grid");
  const emptyState = document.getElementById("empty-state");

  if (lista.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
  } else {
    grid.innerHTML = lista.map(crearTarjeta).join("");
    emptyState.style.display = "none";
    grid.querySelectorAll(".card").forEach((card, i) => {
      card.addEventListener("click", () => abrirModal(lista[i]));
    });
  }
}

// Filtra por chip activo
document.querySelectorAll(".filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    ocultarBienvenida();
    document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("filter-chip--active"));
    chip.classList.add("filter-chip--active");

    const filtro = chip.textContent.trim();
    if (filtro === "Todo") {
      renderizarTarjetas(restaurantes);
    } else {
      const filtrados = restaurantes.filter(r => r.tipo.includes(filtro));
      renderizarTarjetas(filtrados);
    }
  });
});

// Lógica del botón Buscar
const inputs = document.querySelectorAll(".search-bar__field input");
const inputCiudad = inputs[0];
const inputTipo = inputs[1];
const botonBuscar = document.querySelector(".search-bar__btn");

// Dropdown de precio
const dropdown = document.getElementById("dropdown-precio");
const dropdownTrigger = dropdown.querySelector(".dropdown__trigger");
const dropdownLabel = dropdown.querySelector(".dropdown__label");
let precioSeleccionado = "";

dropdownTrigger.addEventListener("click", () => {
  dropdown.classList.toggle("dropdown--open");
});

dropdown.querySelectorAll(".dropdown__option").forEach(option => {
  option.addEventListener("click", () => {
    precioSeleccionado = option.dataset.value;
    dropdownLabel.textContent = option.textContent;
    dropdownTrigger.classList.toggle("has-value", precioSeleccionado !== "");
    dropdown.querySelectorAll(".dropdown__option").forEach(o => o.classList.remove("dropdown__option--selected"));
    option.classList.add("dropdown__option--selected");
    dropdown.classList.remove("dropdown--open");
  });
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) dropdown.classList.remove("dropdown--open");
});

[inputCiudad, inputTipo].forEach(input => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") botonBuscar.click();
  });
});

botonBuscar.addEventListener("click", () => {
  ocultarBienvenida();
  const textoCiudad = inputCiudad.value.trim().toLowerCase();
  const textoTipo = inputTipo.value.trim().toLowerCase();
  const precioMax = precioSeleccionado === "" ? null : parseInt(precioSeleccionado);

  const filtrados = restaurantes.filter(r => {
    const coincideCiudad = textoCiudad === "" || r.ciudad.toLowerCase().includes(textoCiudad);
    const coincideTipo = textoTipo === "" || r.tipo.some(t => t.toLowerCase().includes(textoTipo));
    const coincidePrecio = precioMax === null || r.precio <= precioMax;
    return coincideCiudad && coincideTipo && coincidePrecio;
  });

  renderizarTarjetas(filtrados);
});

// Estado de bienvenida
const welcomeState = document.getElementById("welcome-state");
const esPrimeraVisita = !localStorage.getItem("trovi_visitado");

if (!esPrimeraVisita) {
  welcomeState.style.display = "none";
  renderizarTarjetas(restaurantes);
}

function ocultarBienvenida() {
  if (welcomeState.style.display !== "none") {
    welcomeState.style.display = "none";
    localStorage.setItem("trovi_visitado", "true");
    renderizarTarjetas(restaurantes);
  }
}

document.getElementById("hint-ciudad").addEventListener("click", () => {
  ocultarBienvenida();
  inputCiudad.focus();
});

document.getElementById("hint-tipo").addEventListener("click", () => {
  ocultarBienvenida();
  inputTipo.focus();
});

document.getElementById("hint-precio").addEventListener("click", () => {
  ocultarBienvenida();
  dropdownTrigger.click();
});

// Modal de detalle
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");

function abrirModal(restaurante) {
  document.getElementById("modal-emoji").textContent = restaurante.emoji;
  document.getElementById("modal-nombre").textContent = restaurante.nombre;
  document.getElementById("modal-rating").textContent = `★ ${restaurante.valoracion} · ${restaurante.numValoraciones} valoraciones · ${restaurante.barrio}, ${restaurante.ciudad}`;
  document.getElementById("modal-gancho").textContent = `"${restaurante.porQueIr}"`;
  document.getElementById("modal-descripcion").textContent = restaurante.descripcion;
  document.getElementById("modal-direccion").textContent = restaurante.direccion;
  document.getElementById("modal-horario").textContent = restaurante.horario;
  document.getElementById("modal-precio-medio").textContent = `Precio medio por persona: ${restaurante.precioMedio}€`;
  document.getElementById("modal-tags").innerHTML = restaurante.tipo.map(t => `<span class="card__tag">${t}</span>`).join("");
  modalOverlay.classList.add("modal-overlay--open");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  modalOverlay.classList.remove("modal-overlay--open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", cerrarModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) cerrarModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModal();
});

// Carga inicial
renderizarTarjetas(restaurantes);
