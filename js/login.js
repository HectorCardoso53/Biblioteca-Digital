import { renderNavbar, renderFooter } from './layout.js';
import { getCurrentUser, setCurrentUser } from './storage.js';
import { seedIfEmpty } from './books.js';

// init
seedIfEmpty();
renderNavbar('', 'login');
renderFooter();

// redirect
if (getCurrentUser()) {
  window.location.href = 'index.html';
}

// ================= FUNÇÕES =================
function switchTab(tab) {
  document.getElementById('sec-login').classList.toggle('hidden', tab !== 'login');
  document.getElementById('sec-register').classList.toggle('hidden', tab !== 'register');

  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
}

function togglePass(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

function demoAdmin() {
  const admin = {
    id: 'admin-demo',
    nome: 'Administrador',
    email: 'admin@biblioteca.gov.br',
    tipo: 'admin'
  };

  setCurrentUser(admin);
  window.location.href = 'index.html';
}

// 🔥 GLOBAL (por causa do onclick)
window.switchTab = switchTab;
window.togglePass = togglePass;
window.demoAdmin = demoAdmin;