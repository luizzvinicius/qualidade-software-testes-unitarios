// services/library-service.js
import { Book } from "../models/book.js";
import { User } from "../models/user.js";

export class LibraryService {
  constructor(repository) {
    this.repo = repository;
  }

  QUANTIDADE_MAXIMA_EXEMPLARES = 5;
  MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

  // --- Operações com livros ---
  registerBook(title, author, quantity = 1) {
    if (this.repo.findBook(title)) {
      throw new Error("Livro já existe na biblioteca");
    }
    if (quantity > this.QUANTIDADE_MAXIMA_EXEMPLARES) {
      throw new Error("Quantidade máxima é 5 exemplares");
    }
    const book = new Book(title, author, quantity);
    this.repo.addBook(book);
    return book;
  }

  listBooks() {
    return this.repo.listBooks();
  }

  removeBook(title) {
    const book = this.repo.findBook(title);
    if (!book) throw new Error("Livro não encontrado");
    if (book.quantity !== book.originalQuantity) {
      throw new Error("Não é possível remover: há exemplares emprestados");
    }
    this.repo.removeBook(title);
    return true;
  }

  // --- Operações com usuários ---
  registerUser(id, name) {
    if (typeof id !== "number" || Number.isNaN(id) || !Number.isFinite(id) || id <= 0) {
      throw new Error("Identificador inválido");
    }
    if (this.repo.findUser(id)) {
      throw new Error("Usuário já cadastrado");
    }
    const user = new User(id, name);
    this.repo.addUser(user);
    return user;
  }

  listUsers() {
    return this.repo.listUsers();
  }

  // --- Operações de empréstimo ---
  borrowBook(userId, title, date = new Date()) {
    const user = this.repo.findUser(userId);
    if (!user) throw new Error("Usuário não encontrado");

    const book = this.repo.findBook(title);
    if (!book) throw new Error("Livro não encontrado");
    if (book.quantity <= 0) throw new Error("Nenhum exemplar disponível");

    // regras do usuário
    if (user.loanCount() >= 3) throw new Error("Usuário atingiu o limite de empréstimos (3)");
    if (user.hasBorrowed(book.title)) throw new Error("Usuário já tem esse livro emprestado");

    // tudo ok -> registra empréstimo
    book.quantity -= 1;
    user.borrow(book.title, date);
    return true;
  }

  returnBook(userId, title, date = new Date()) {
    const user = this.repo.findUser(userId);
    if (!user) throw new Error("Usuário não encontrado");

    const book = this.repo.findBook(title);
    if (!book) throw new Error("Livro não encontrado");

    if (!user.hasBorrowed(book.title)) throw new Error("Usuário não emprestou este livro");

    const borrowDate = user.loanDate(book.title);
    if (date < borrowDate) throw new Error("Data de devolução inválida");

    if (book.quantity + 1 > 5) throw new Error("Quantidade máxima atingida");

    // devolução
    book.quantity += 1;
    user.return(book.title);
    return {
      title: book.title,
      borrowDate,
      returnDate: date,
      days: Math.floor((date - borrowDate) / this.MILISSEGUNDOS_POR_DIA),
    };
  }

  listLoans(userId) {
    const user = this.repo.findUser(userId);
    if (!user) throw new Error("Usuário não encontrado");
    return user.listLoans();
  }

  listLoansWithDates(userId) {
    const user = this.repo.findUser(userId);
    if (!user) throw new Error("Usuário não encontrado");
    return user.listLoansWithDates();
  }
}
