import { getCurrentUser, controlarCTA } from './storage.js';
import { verificarReservas, getStats, seedIfEmpty } from './books.js';
import { animateCounter } from './ui.js';
import { renderNavbar, renderFooter, initNavbarScroll } from './layout.js';
function controlarHeroLogin() {
  const btn = document.getElementById('hero-login-btn');
  const user = getCurrentUser();

  if (!btn) return;

  btn.style.display = user ? 'none' : 'inline-flex';
}

function initHome() {
  verificarReservas();
  renderNavbar('home');
  renderFooter();
  initNavbarScroll();
  controlarHeroLogin();
  controlarCTA(); // 🔥 ESSENCIAL

  const stats = getStats();

  animateCounter(document.getElementById('stat-livros'), stats.totalLivros);
  animateCounter(document.getElementById('stat-usuarios'), stats.totalUsuarios);
  animateCounter(document.getElementById('stat-emprestimos'), stats.emprestimosAtivos);
}


initHome(); 