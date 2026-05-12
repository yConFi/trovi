// Datos de ejemplo — en el futuro vendrán de una base de datos real
const restaurantes = [
  {
    nombre: "La Pepita",
    emoji: "🥑",
    tipo: ["Brunch", "Cafetería"],
    valoracion: 4.8,
    numValoraciones: 342,
    ciudad: "Madrid",
    barrio: "Malasaña",
    precio: 2,
    precioMax: 4,
  },
  {
    nombre: "Yakitori Taro",
    emoji: "🍱",
    tipo: ["Japonesa", "Restaurante"],
    valoracion: 4.6,
    numValoraciones: 218,
    ciudad: "Madrid",
    barrio: "Lavapiés",
    precio: 2,
    precioMax: 4,
  },
  {
    nombre: "Zezeo",
    emoji: "🍺",
    tipo: ["Tapas", "Bar"],
    valoracion: 4.5,
    numValoraciones: 511,
    ciudad: "Sevilla",
    barrio: "Utrera",
    precio: 1,
    precioMax: 4,
  },
  {
    nombre: "Toto Pizza",
    emoji: "🍕",
    tipo: ["Italiana", "Restaurante"],
    valoracion: 4.7,
    numValoraciones: 189,
    ciudad: "Barcelona",
    barrio: "Gràcia",
    precio: 2,
    precioMax: 4,
  },
  {
    nombre: "Mar & Brasa",
    emoji: "🦞",
    tipo: ["Mediterránea", "Restaurante"],
    valoracion: 4.9,
    numValoraciones: 97,
    ciudad: "Valencia",
    barrio: "El Carmen",
    precio: 3,
    precioMax: 4,
  },
  {
    nombre: "Café Colón",
    emoji: "☕",
    tipo: ["Cafetería", "Brunch"],
    valoracion: 4.4,
    numValoraciones: 403,
    ciudad: "Madrid",
    barrio: "Retiro",
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
  grid.innerHTML = lista.map(crearTarjeta).join("");
}

// Filtra por chip activo
document.querySelectorAll(".filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("filter-chip--active"));
    chip.classList.add("filter-chip--active");

    const filtro = chip.textContent.trim();
    if (filtro === "Todo") {
      renderizarTarjetas(restaurantes);
    } else {
      const filtrados = restaurantes.filter(r => r.tipo.includes(filtro));
      renderizarTarjetas(filtrados.length > 0 ? filtrados : restaurantes);
    }
  });
});

// Lógica del botón Buscar
const inputCiudad = document.querySelector(".search-bar__field input");
const botonBuscar = document.querySelector(".search-bar__btn");

botonBuscar.addEventListener("click", () => {
  const textoCiudad = inputCiudad.value.trim().toLowerCase();

  if (textoCiudad === "") {
    renderizarTarjetas(restaurantes);
    return;
  }

  const filtrados = restaurantes.filter(r =>
    r.ciudad.toLowerCase().includes(textoCiudad)
  );

  renderizarTarjetas(filtrados);
});

// Carga inicial
renderizarTarjetas(restaurantes);
