// ================= NAVBAR UNIVERSAL =================
function renderNavbar(active) {
  const u = JSON.parse(localStorage.getItem('bdp_currentUser'));

  document.getElementById('navbar').innerHTML = `
    <div class="nav-inner">

      <button class="nav-toggle" id="nav-toggle">
        <i class="bi bi-list"></i>
      </button>

      <a href="index.html" class="nav-brand">
        <div class="nav-logo">
          <i class="bi bi-book-half"></i>
        </div>
        <div>
          <span class="brand-name">Biblioteca Digital</span>
          <span class="brand-sub">Pública Municipal</span>
        </div>
      </a>

      <nav class="nav-links">
        <a href="index.html" class="${active === 'home' ? 'active' : ''}">
          <i class="bi bi-house-door"></i> Início
        </a>

        <a href="acervo.html" class="${active === 'acervo' ? 'active' : ''}">
          <i class="bi bi-book"></i> Acervo
        </a>

        <a href="quem-somos.html" class="${active === 'quemsomos' ? 'active' : ''}">
          <i class="bi bi-people"></i> Quem Somos
        </a>

        ${u && u.tipo === 'admin' ? `
          <a href="admin.html">
            <i class="bi bi-gear"></i> Admin
          </a>
        ` : ''}
      </nav>

      <div class="nav-auth">
        ${
          u
            ? `
              <a href="conta.html" class="nav-user">
                <div class="user-av">${u.nome.charAt(0).toUpperCase()}</div>
                <span class="user-nm">${u.nome.split(' ')[0]}</span>
              </a>
              <button class="btn btn-ghost btn-sm" id="logout-btn">
                <i class="bi bi-box-arrow-right"></i> Sair
              </button>
            `
            : `
              <a href="login.html" class="btn btn-outline btn-sm">
                <i class="bi bi-box-arrow-in-right"></i> Entrar
              </a>
            `
        }
      </div>
    </div>
  `;

  // Mobile toggle
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  const lb = document.getElementById('logout-btn');
  if (lb) {
    lb.onclick = () => {
      localStorage.removeItem('bdp_currentUser');
      window.location.href = 'index.html';
    };
  }
}

// ================= FOOTER UNIVERSAL =================
function renderFooter() {
  document.getElementById('footer').innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">
            <i class="bi bi-book-half"></i>
          </div>
          <div>
            <div class="footer-name">Biblioteca Digital Pública Municipal</div>
            <div class="footer-slogan">Conhecimento para todos.</div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        © ${new Date().getFullYear()} Biblioteca Digital Pública Municipal.
      </div>
    </div>
  `;
}