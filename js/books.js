// importa dependências corretamente
import { getBooks, saveBooks, getUsers, saveUsers, getUserByEmail } from './storage.js';

// ================= STATS =================
export function getStats() {
  const books = getBooks();
  const users = getUsers();

  return {
    totalLivros: books.length,
    totalUsuarios: users.filter(u => u.tipo === 'user').length,
    emprestimosAtivos: books.filter(b => b.status === 'emprestado').length,
    reservasPendentes: books.filter(b => b.status === 'reservado').length,
  };
}

// ================= RESERVAS =================
export function verificarReservas() {
  const agora = new Date();
  const books = getBooks();
  let ok = false;

  books.forEach(b => {
    if (b.status === 'reservado' && b.prazoRetirada && agora > new Date(b.prazoRetirada)) {
      b.status = 'disponivel';
      b.emprestadoPara = null;
      b.dataReserva = null;
      b.prazoRetirada = null;
      ok = true;
    }
  });

  if (ok) saveBooks(books);
}

// ================= SEED =================
export function seedIfEmpty() {
  if (getBooks().length > 0) return;

  if (!getUserByEmail('admin@biblioteca.gov.br')) {
    saveUsers([{
      id: Date.now().toString(),
      nome: 'Administrador',
      email: 'admin@biblioteca.gov.br',
      senha: 'admin123',
      tipo: 'admin',
      criadoEm: new Date().toISOString()
    }]);
  }

  const livros = [
    { titulo: 'Dom Casmurro', autor: 'Machado de Assis', categoria: 'Literatura Brasileira', ano: '1899', descricao: 'Clássico.' },
    { titulo: '1984', autor: 'George Orwell', categoria: 'Ficção Científica', ano: '1949', descricao: 'Distopia.' }
  ];

  const books = livros.map(l => ({
    id: Date.now().toString() + Math.random(),
    ...l,
    capa: '',
    status: 'disponivel',
    emprestadoPara: null,
    dataReserva: null,
    prazoRetirada: null,
    criadoEm: new Date().toISOString()
  }));

  saveBooks(books);
}

// ================= HELPERS =================
export function getBookById(id) {
  return getBooks().find(b => b.id === id) || null;
}

export function updateBook(id, data) {
  const books = getBooks().map(b =>
    b.id === id ? { ...b, ...data } : b
  );
  saveBooks(books);
}