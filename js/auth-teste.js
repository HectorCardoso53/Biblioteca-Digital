
    const K = { USERS: 'bdp_users', BOOKS: 'bdp_books', CU: 'bdp_currentUser', EXT: 'bdp_extLoans' };
    const sg = k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
    const ss = (k, v) => localStorage.setItem(k, JSON.stringify(v));
    const gid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    function getUsers() { return sg(K.USERS) || []; }
    function saveUsers(u) { ss(K.USERS, u); }
    function getUserByEmail(e) { return getUsers().find(u => u.email.toLowerCase() === e.toLowerCase()) || null; }
    function getBooks() { return sg(K.BOOKS) || []; }
    function saveBooks(b) { ss(K.BOOKS, b); }
    function getCurrentUser() { return sg(K.CU); }
    function setCurrentUser(u) { ss(K.CU, u); }

    function seedIfEmpty() {
      if (getBooks().length > 0) return;
      if (!getUserByEmail('admin@biblioteca.gov.br')) { const u = { id: gid(), nome: 'Administrador', email: 'admin@biblioteca.gov.br', senha: 'admin123', tipo: 'admin', criadoEm: new Date().toISOString() }; saveUsers([u]); }
      const livros = [
        { titulo: 'Dom Casmurro', autor: 'Machado de Assis', categoria: 'Literatura Brasileira', ano: '1899', descricao: 'Um clássico sobre amor, ciúme e traição.' },
        { titulo: 'O Cortiço', autor: 'Aluísio Azevedo', categoria: 'Literatura Brasileira', ano: '1890', descricao: 'Romance naturalista.' },
        { titulo: 'Iracema', autor: 'José de Alencar', categoria: 'Literatura Brasileira', ano: '1865', descricao: 'Romance indianista.' },
        { titulo: 'Grande Sertão: Veredas', autor: 'João Guimarães Rosa', categoria: 'Literatura Brasileira', ano: '1956', descricao: 'Obra-prima da literatura.' },
        { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', categoria: 'Fantasia', ano: '1954', descricao: 'A épica jornada de Frodo.' },
        { titulo: 'Sapiens', autor: 'Yuval Noah Harari', categoria: 'História', ano: '2011', descricao: 'Uma breve história da humanidade.' },
        { titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', categoria: 'Fábula', ano: '1943', descricao: 'Um príncipe viaja por planetas.' },
        { titulo: 'Cem Anos de Solidão', autor: 'Gabriel García Márquez', categoria: 'Romance', ano: '1967', descricao: 'A saga da família Buendía.' },
        { titulo: 'A Revolução dos Bichos', autor: 'George Orwell', categoria: 'Fábula', ano: '1945', descricao: 'Alegoria política.' },
        { titulo: '1984', autor: 'George Orwell', categoria: 'Ficção Científica', ano: '1949', descricao: 'Distopia sobre totalitarismo.' },
        { titulo: 'Admirável Mundo Novo', autor: 'Aldous Huxley', categoria: 'Ficção Científica', ano: '1932', descricao: 'Futuro onde a felicidade é obrigatória.' },
        { titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', categoria: 'Fantasia', ano: '1937', descricao: 'A aventura de Bilbo Bolseiro.' },
        { titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', categoria: 'Literatura Brasileira', ano: '1881', descricao: 'Narrado por um defunto autor.' },
        { titulo: 'Crime e Castigo', autor: 'Fiodor Dostoiévski', categoria: 'Romance', ano: '1866', descricao: 'A história de Raskólnikov.' },
        { titulo: 'Sagarana', autor: 'João Guimarães Rosa', categoria: 'Contos', ano: '1946', descricao: 'Contos do sertão mineiro.' },
      ];
      saveBooks(livros.map(l => ({ id: gid(), ...l, capa: '', status: 'disponivel', emprestadoPara: null, dataReserva: null, prazoRetirada: null, dataEmprestimo: null, dataDevolucao: null, criadoEm: new Date().toISOString() })));
    }

    function showToast(msg, tipo = 'info', dur = 3500) {
      let c = document.getElementById('toast-container');
      const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
      const t = document.createElement('div'); t.className = `toast toast-${tipo}`;
      t.innerHTML = `<span>${icons[tipo]}</span>${msg}`; c.appendChild(t);
      setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = 'all .3s'; setTimeout(() => t.remove(), 310); }, dur);
    }


    function switchTab(t) {
      const isL = t === 'login';
      document.getElementById('sec-login').classList.toggle('hidden', !isL);
      document.getElementById('sec-register').classList.toggle('hidden', isL);
      document.getElementById('tab-login').classList.toggle('active', isL);
      document.getElementById('tab-register').classList.toggle('active', !isL);
    }

    function togglePass(id) { const i = document.getElementById(id); i.type = i.type === 'password' ? 'text' : 'password'; }

    function demoAdmin() {
      document.getElementById('l-email').value = 'admin@biblioteca.gov.br';
      document.getElementById('l-senha').value = 'admin123';
      showToast('Credenciais admin preenchidas!', 'info');
    }

    document.getElementById('form-login').addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('l-email').value;
      const senha = document.getElementById('l-senha').value;
      const errEl = document.getElementById('login-err');
      errEl.classList.add('hidden');
      const user = getUserByEmail(email);
      if (!user) { errEl.textContent = 'Usuário não encontrado.'; errEl.classList.remove('hidden'); return; }
      if (user.senha !== senha) { errEl.textContent = 'Senha incorreta.'; errEl.classList.remove('hidden'); return; }
      setCurrentUser(user);
      showToast(`Bem-vindo, ${user.nome}!`, 'success');
      setTimeout(() => { window.location.href = user.tipo === 'admin' ? 'admin.html' : 'index.html'; }, 600);
    });

    document.getElementById('form-register').addEventListener('submit', e => {
      e.preventDefault();
      const nome = document.getElementById('r-nome').value.trim();
      const email = document.getElementById('r-email').value.trim();
      const senha = document.getElementById('r-senha').value;
      const errEl = document.getElementById('reg-err');
      errEl.classList.add('hidden');
      if (!nome) { errEl.textContent = 'Nome é obrigatório.'; errEl.classList.remove('hidden'); return; }
      if (getUserByEmail(email)) { errEl.textContent = 'E-mail já cadastrado.'; errEl.classList.remove('hidden'); return; }
      if (senha.length < 6) { errEl.textContent = 'Senha deve ter pelo menos 6 caracteres.'; errEl.classList.remove('hidden'); return; }
      const users = getUsers();
      const u = { id: gid(), nome, email, senha, tipo: 'user', criadoEm: new Date().toISOString() };
      users.push(u); saveUsers(users); setCurrentUser(u);
      showToast('Conta criada com sucesso!', 'success');
      setTimeout(() => { window.location.href = 'index.html'; }, 600);
    });


window.switchTab = switchTab;
window.togglePass = togglePass;
window.demoAdmin = demoAdmin;