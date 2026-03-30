export function showToast(msg, tipo = 'info', dur = 3500) {
  let c = document.getElementById('toast-container');

  if (!c) {
    c = document.createElement('div');
    c.id = 'toast-container';
    document.body.appendChild(c);
  }

  const t = document.createElement('div');
  t.className = `toast toast-${tipo}`;
  t.innerHTML = msg;
  c.appendChild(t);

  setTimeout(() => t.remove(), dur);
}

export function animateCounter(el, target, dur = 800) {
  let s = 0;
  const step = target / (dur / 16);

  const tick = () => {
    s = Math.min(s + step, target);
    el.textContent = Math.round(s);
    if (s < target) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export function fmtDate(iso) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('pt-BR').format(new Date(iso));
}

export function closeModal() {
  const m = document.getElementById('active-modal');
  if (m) m.remove();
}

export function openModal(html, onMount) {
  closeModal();

  const ov = document.createElement('div');
  ov.className = 'modal-overlay';
  ov.id = 'active-modal';

  ov.innerHTML = `<div class="modal">${html}</div>`;

  ov.addEventListener('click', e => {
    if (e.target === ov) closeModal();
  });

  document.body.appendChild(ov);

  if (onMount) onMount(ov);
}


export function statusBadge(s) {
  const map = {
    disponivel: '<span class="badge badge-green">Disponível</span>',
    reservado: '<span class="badge badge-orange">Reservado</span>',
    emprestado: '<span class="badge badge-red">Emprestado</span>'
  };

  return map[s] || `<span class="badge badge-gray">${s}</span>`;
}

export function capaHtml(livro, h = 200) {
  if (livro.capa) {
    return `
      <img src="${livro.capa}" 
           alt="${livro.titulo}" 
           style="width:100%;height:${h}px;object-fit:cover"
           onerror="this.parentElement.innerHTML='<div class=capa-ph><i class=&quot;bi bi-book&quot;></i></div>'">
    `;
  }

  return '<div class="capa-ph"><i class="bi bi-book"></i></div>';
}