// ================= IMPORTS =================
import { seedIfEmpty, verificarReservas, getBookById, updateBook } from './books.js';
import { getBooks, getCurrentUser } from './storage.js';
import { renderNavbar, renderFooter } from './layout.js';
import { showToast, openModal, closeModal, capaHtml, statusBadge, fmtDate } from './ui.js';

// ===================== ACERVO =====================
const CATS = [
  "Literatura Brasileira",
  "Romance",
  "Contos",
  "Fantasia",
  "Ficção Científica",
  "História",
  "Fábula",
  "Biografia",
  "Filosofia",
  "Ciências",
  "Direito",
  "Outros",
];

let filtros = { busca: "", cat: "" };

// ================= FILTROS =================
function initFiltros() {
  const sel = document.getElementById("filtro-cat");
  sel.innerHTML = '<option value="">Todas as categorias</option>';

  CATS.forEach((c) => {
    const o = document.createElement("option");
    o.value = c;
    o.textContent = c;
    sel.appendChild(o);
  });

  document.getElementById("busca").addEventListener("input", (e) => {
    filtros.busca = e.target.value;
    renderGrid();
  });

  sel.addEventListener("change", (e) => {
    filtros.cat = e.target.value;
    renderGrid();
  });
}

// ================= FILTRO =================
function getLivrosFiltrados() {
  const q = filtros.busca.toLowerCase();

  return getBooks().filter((b) => {
    const mq =
      !q ||
      b.titulo.toLowerCase().includes(q) ||
      b.autor.toLowerCase().includes(q);

    const mc = !filtros.cat || b.categoria === filtros.cat;

    return mq && mc;
  });
}

// ================= GRID =================
function renderGrid() {
  const container = document.getElementById("livros-grid");
  const livros = getLivrosFiltrados();

  document.getElementById("total").textContent = livros.length;

  if (!livros.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <i class="bi bi-journal-x"></i>
        </div>
        <h3>Nenhum livro encontrado</h3>
        <p>Tente mudar os filtros.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = livros.map((b) => `
    <div class="livro-card" onclick="abrirDetalhe('${b.id}')">
      <div class="livro-capa">
        ${capaHtml(b)}
        <div class="status-badge-abs">${statusBadge(b.status)}</div>
      </div>

      <div class="livro-corpo">
        <div class="livro-titulo">${b.titulo}</div>
        <div class="livro-autor">${b.autor}</div>

        <div class="livro-meta">
          <span class="badge badge-blue">${b.categoria}</span>
          ${b.ano ? `<span class="badge badge-gray">${b.ano}</span>` : ""}
        </div>

        <div class="livro-footer">
          <button class="btn btn-primary btn-sm" style="width:100%"
            onclick="event.stopPropagation();abrirDetalhe('${b.id}')">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// ================= INIT =================
function initAcervo() {
  seedIfEmpty();
  verificarReservas();

  renderNavbar("acervo");
  renderFooter();

  initFiltros();
  renderGrid();
}

// ================= DETALHE =================
function abrirDetalhe(id) {
  const b = getBookById(id);
  if (!b) return;

  const u = getCurrentUser();

  const jaRes = u && b.emprestadoPara === u.id && b.status === "reservado";

  let acao = "";

  if (!u) {
    acao = `
      <a href="login.html" class="btn btn-primary" style="width:100%">
        Entrar para Reservar
      </a>`;
  } else if (b.status === "disponivel") {
    acao = `
      <button class="btn btn-primary" style="width:100%" onclick="reservar('${id}')">
        Reservar este Livro
      </button>`;
  } else if (jaRes) {
    acao = `
      <div class="alert alert-info">
        Você reservou até <strong>${fmtDate(b.prazoRetirada)}</strong>
      </div>`;
  } else {
    acao = `
      <div class="alert alert-warning">
        Livro indisponível no momento.
      </div>`;
  }

  openModal(`
    <div class="modal-header">
      <span class="modal-title">Detalhes do Livro</span>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>

    <div class="detail-grid">
      <div class="detail-capa">${capaHtml(b, 190)}</div>

      <div class="detail-info">
        <h2>${b.titulo}</h2>
        <p><strong>Autor:</strong> ${b.autor}</p>
        <p><strong>Categoria:</strong> ${b.categoria}</p>
        ${b.ano ? `<p><strong>Ano:</strong> ${b.ano}</p>` : ""}
        <p><strong>Status:</strong> ${statusBadge(b.status)}</p>
      </div>
    </div>

    <div style="margin-top:20px">
      ${acao}
    </div>
  `);
}

// ================= RESERVA =================
function reservar(id) {
  const u = getCurrentUser();

  if (!u) {
    window.location.href = "login.html";
    return;
  }

  const b = getBookById(id);

  if (!b || b.status !== "disponivel") {
    showToast("Livro não disponível.", "error");
    return;
  }

  const hoje = new Date();
  const prazo = new Date();
  prazo.setDate(prazo.getDate() + 1);

  updateBook(id, {
    status: "reservado",
    emprestadoPara: u.id,
    dataReserva: hoje.toISOString(),
    prazoRetirada: prazo.toISOString(),
  });

  closeModal();
  renderGrid();
  showToast("Reserva realizada com sucesso!", "success");
}

// ================= GLOBAL (OBRIGATÓRIO) =================
window.abrirDetalhe = abrirDetalhe;
window.reservar = reservar;

// ================= START =================
initAcervo();