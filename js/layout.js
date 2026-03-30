// ================= NAVBAR =================
export function renderNavbar(active, mode = "full") {
  const isLoginMode = mode === "login";

  const u = JSON.parse(localStorage.getItem("bdp_currentUser"));

  document.getElementById("navbar").innerHTML = `
    <div class="nav-inner">

      ${
        !isLoginMode
          ? `
        <button class="nav-toggle" id="nav-toggle">
          <i class="bi bi-list"></i>
        </button>
      `
          : ""
      }

      <a href="index.html" class="nav-brand">
        <div class="nav-logo">
          <i class="bi bi-book-half"></i>
        </div>
        <div>
          <span class="brand-name">Biblioteca Digital</span>
          <span class="brand-sub">Pública Municipal</span>
        </div>
      </a>

      ${
        !isLoginMode
          ? `
        <nav class="nav-links">
          <a href="index.html" class="${active === "home" ? "active" : ""}">
            <i class="bi bi-house-door"></i> Início
          </a>

          <a href="acervo.html" class="${active === "acervo" ? "active" : ""}">
            <i class="bi bi-book"></i> Acervo
          </a>

          <a href="quem-somos.html" class="${active === "quemsomos" ? "active" : ""}">
            <i class="bi bi-people"></i> Quem Somos
          </a>

          ${
            u && u.tipo === "admin"
              ? `
            <a href="admin.html">
              <i class="bi bi-gear"></i> Admin
            </a>
          `
              : ""
          }
        </nav>
      `
          : '<div style="flex:1"></div>'
      }

      <div class="nav-auth">
        ${
          isLoginMode
            ? `
            <a href="acervo.html" class="btn btn-outline btn-sm">
              <i class="bi bi-book"></i> Ver Acervo
            </a>
          `
            : u
              ? `
              <a href="conta.html" class="nav-user">
                <div class="user-av">${u.nome.charAt(0).toUpperCase()}</div>
                <span class="user-nm">${u.nome.split(" ")[0]}</span>
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

  if (!isLoginMode) {
    const toggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }

    const lb = document.getElementById("logout-btn");
    if (lb) {
      lb.onclick = () => {
        localStorage.removeItem("bdp_currentUser");
        window.location.href = "index.html";
      };
    }
  }
}

// ================= FOOTER =================
export function renderFooter() {
  const year = new Date().getFullYear();

  document.getElementById("footer").innerHTML = `
    <div class="footer-inner container">
      
      <div class="footer-brand">
        <div class="footer-logo">
          <i class="bi bi-book-half"></i>
        </div>
        <div>
          <div class="footer-name">
            Biblioteca Digital Pública Municipal
          </div>
          <div class="footer-slogan">
            Conhecimento para todos.
          </div>
        </div>
      </div>

      <div class="footer-links">
        <div class="footer-col">
          <h4>Navegação</h4>
          <a href="index.html">Início</a>
          <a href="acervo.html">Acervo</a>
          <a href="quem-somos.html">Quem Somos</a>
        </div>

        <div class="footer-col">
          <h4>Contato</h4>
          <span>Centro Municipal</span>
          <span>biblioteca@municipio.gov.br</span>
          <span>(00) 0000-0000</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom container">
      © ${year} Biblioteca Digital Pública Municipal
    </div>
  `;
}

// ================= SCROLL EFFECT =================
export function initNavbarScroll() {
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}