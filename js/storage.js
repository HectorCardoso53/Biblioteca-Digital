// ================= CONSTANTES =================
export const K = {
  USERS: 'bdp_users',
  BOOKS: 'bdp_books',
  CU: 'bdp_currentUser',
  EXT: 'bdp_extLoans'
};

// ================= HELPERS =================
const sg = k => {
  try { return JSON.parse(localStorage.getItem(k)); }
  catch { return null; }
};

const ss = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const gid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ================= USERS =================
export function getUsers() { return sg(K.USERS) || []; }
export function saveUsers(u) { ss(K.USERS, u); }
export function getUserById(id) { return getUsers().find(u => u.id === id) || null; }
export function getUserByEmail(e) { return getUsers().find(u => u.email.toLowerCase() === e.toLowerCase()) || null; }
export function getCurrentUser() { return sg(K.CU); }
export function setCurrentUser(u) { ss(K.CU, u); }

// ================= BOOKS =================
export function getBooks() { return sg(K.BOOKS) || []; }
export function saveBooks(b) { ss(K.BOOKS, b); }

// ================= CTA =================
export function controlarCTA() {
  const user = getCurrentUser();
  const cta = document.getElementById('cta-section');

  if (!cta) return;

  if (!user) {
    cta.innerHTML = `
      <div class="container">
        <h2 class="cta-title">Comece a explorar agora</h2>
        <p class="cta-subtitle">Cadastre-se gratuitamente e tenha acesso a todo o nosso acervo.</p>
        <div class="cta-btns">
          <a href="login.html" class="btn btn-lg btn-light">
            Criar Conta
          </a>
          <a href="acervo.html" class="btn btn-lg btn-light">
            Ver Acervo
          </a>
        </div>
      </div>
    `;
  } else {
    cta.innerHTML = `
      <div class="container">
        <h2 class="cta-title">Bem-vindo de volta, ${user.nome.split(" ")[0]}</h2>
        <p class="cta-subtitle">Continue explorando ou gerencie seus livros.</p>
        <div class="cta-btns">
          <a href="acervo.html" class="btn btn-lg btn-light">
            Explorar Acervo
          </a>
          <a href="conta.html" class="btn btn-lg btn-light">
            Minha Conta
          </a>
        </div>
      </div>
    `;
  }
}

export function getStats() {
  const livros = getBooks();
  const usuarios = getUsers();

  // exemplo simples (ajusta depois se quiser)
  const emprestimosAtivos = livros.filter(l => l.emprestado).length;

  return {
    totalLivros: livros.length,
    totalUsuarios: usuarios.length,
    emprestimosAtivos
  };
}

export function seedIfEmpty() {
  if (!localStorage.getItem(K.USERS)) {
    saveUsers([]);
  }

  if (!localStorage.getItem(K.BOOKS)) {
    saveBooks([]);
  }

  if (!localStorage.getItem(K.EXT)) {
    ss(K.EXT, []);
  }
}