import { jest } from "@jest/globals";
import { Book } from "../src/models/book.js";
import { User } from "../src/models/user.js";
import { InMemoryRepository } from "../src/repo/in-memory-repository.js";
import { LibraryService } from "../src/services/library-service.js";

const bookDuna = { title: "Duna", author: "Frank Herbert", quantity: 2 };
const ana = { id: 1, name: "Ana" };
const bia = { id: 2, name: "Bia" };

describe("LibraryService", () => {
  let service;
  let repo;

  beforeEach(() => {
    repo = new InMemoryRepository();
    service = new LibraryService(repo);
  });

  describe("registerBook", () => {
    test("registra um livro válido e mantém a quantidade disponível atualizada", () => {
      const book = service.registerBook(bookDuna.title, bookDuna.author, bookDuna.quantity);

      expect(book).toMatchObject({
        title: bookDuna.title,
        author: bookDuna.author,
        quantity: bookDuna.quantity,
        originalQuantity: bookDuna.quantity,
      });
      expect(service.listBooks()).toHaveLength(1);
      expect(service.listBooks()[0].quantity).toBe(bookDuna.quantity);
    });

    test("registra um livro com 1 exemplar quando a quantidade não é informada", () => {
      const book = service.registerBook(bookDuna.title, bookDuna.author);

      expect(book.quantity).toBe(1);
      expect(book.originalQuantity).toBe(1);
    });

    test("lança erro ao cadastrar um livro já existente", () => {
      service.registerBook(bookDuna.title, bookDuna.author, 1);

      expect(() => service.registerBook(bookDuna.title, bookDuna.author, 2)).toThrow(
        "Livro já existe na biblioteca"
      );
    });

    test("lança erro ao cadastrar um livro já existente com título em caixa diferente", () => {
      service.registerBook("Dom Casmurro", "Machado de Assis", 1);

      expect(() => service.registerBook("DOM CASMURRO", "Machado de Assis", 1)).toThrow(
        "Livro já existe na biblioteca"
      );
    });

    test.each([1, 5])(
      "registra um livro com a quantidade limite de exemplares (%p)",
      (quantity) => {
        const book = service.registerBook(bookDuna.title, bookDuna.author, quantity);

        expect(book.quantity).toBe(quantity);
        expect(service.listBooks()[0].quantity).toBe(quantity);
      }
    );

    test("lança erro quando a quantidade de exemplares ultrapassa o limite", () => {
      expect(() => service.registerBook(bookDuna.title, bookDuna.author, 6)).toThrow(
        "Quantidade máxima é 5 exemplares"
      );
    });

    test.each([0, -1])(
      "lança erro ao criar um livro com quantidade inválida (%p)",
      (quantity) => {
        expect(() => new Book(bookDuna.title, bookDuna.author, quantity)).toThrow(
          "Quantidade deve ser positiva"
        );
      }
    );

    test("usa o nome 'Desconhecido' quando o autor não é informado", () => {
      const book = new Book(bookDuna.title, undefined, bookDuna.quantity);

      expect(book.author).toBe("Desconhecido");
    });
  });

  describe("Book model", () => {
    test("cria um livro com título e quantidade válidos", () => {
      const book = new Book(bookDuna.title, bookDuna.author, bookDuna.quantity);

      expect(book.title).toBe("Duna");
      expect(book.author).toBe("Frank Herbert");
      expect(book.quantity).toBe(2);
      expect(book.originalQuantity).toBe(2);
    });

    test("lança erro ao criar um livro título vazio", () => {
      expect(() => new Book("", bookDuna.author, bookDuna.quantity)).toThrow("Título inválido");
    });

    test("lança erro ao criar um livro com título não string", () => {
      expect(() => new Book(123, bookDuna.author, bookDuna.quantity)).toThrow("Título inválido");
    });

    test("lança erro ao criar um livro com quantidade decimal", () => {
      expect(() => new Book(bookDuna.author, bookDuna.author, 2.5)).toThrow(
        "Quantidade deve ser positiva"
      );
    });
  });

  describe("listBooks", () => {
    test("retorna todos os livros cadastrados em ordem de cadastro", () => {
      service.registerBook("Duna", "Frank Herbert", 2);
      service.registerBook("Clean Code", "Robert C. Martin", 1);

      const books = service.listBooks();

      expect(books).toHaveLength(2);
      expect(books.map((book) => book.title)).toEqual(["Duna", "Clean Code"]);
    });
  });

  describe("searchBooks (NF01)", () => {
    beforeEach(() => {
      service.registerBook("Duna", "Frank Herbert", 2);
      service.registerBook("Os Filhos de Duna", "Frank Herbert", 1);
      service.registerBook("Clean Code", "Robert C. Martin", 1);
      service.registerBook("Clean Architecture", "Robert C. Martin", 1);
      service.registerBook("Dom Casmurro", "Machado de Assis", 3);
    });

    test("encontra o livro pelo título exato", () => {
      const books = service.searchBooks("Dom Casmurro");

      expect(books).toMatchObject([
        { title: "Dom Casmurro", author: "Machado de Assis", quantity: 3 },
      ]);
    });

    test("encontra os livros pela parte do título", () => {
      const books = service.searchBooks("Clean");

      expect(books.map((book) => book.title)).toEqual(["Clean Code", "Clean Architecture"]);
    });

    test("encontra os livros pela parte do nome do autor", () => {
      const books = service.searchBooks("Herbert");

      expect(books.map((book) => book.title)).toEqual(["Duna", "Os Filhos de Duna"]);
    });

    test.each(["DUNA", "duna", "dUnA"])(
      "encontra os livros sem diferenciar maiúsculas e minúsculas (%p)",
      (term) => {
        const books = service.searchBooks(term);

        expect(books.map((book) => book.title)).toEqual(["Duna", "Os Filhos de Duna"]);
      }
    );

    test("devolve lista vazia quando nenhum livro corresponde ao termo", () => {
      expect(service.searchBooks("Tolkien")).toEqual([]);
    });

    test.each(["", "   ", undefined])(
      "devolve lista vazia quando o termo é vazio (%p)",
      (term) => {
        expect(service.searchBooks(term)).toEqual([]);
      }
    );
  });

  describe("removeBook", () => {
    test("remove um livro do acervo quando todos os exemplares estão disponíveis (não emprestados)", () => {
      service.registerBook(bookDuna.title, bookDuna.author, bookDuna.quantity);

      const removedBook = service.removeBook(bookDuna.title);

      expect(removedBook).toBe(true);
      expect(service.listBooks()).toHaveLength(0);
    });

    test("lança erro quando o livro não existe", () => {
      expect(() => service.removeBook(bookDuna.author)).toThrow("Livro não encontrado");
    });

    test("lança erro quando há exemplares emprestados", () => {
      service.registerBook(bookDuna.title, bookDuna.author, bookDuna.quantity);
      service.registerUser(ana.id, ana.name);
      service.borrowBook(ana.id, bookDuna.title);

      expect(() => service.removeBook(bookDuna.title)).toThrow(
        "Não é possível remover: há exemplares emprestados"
      );
    });
  });

  describe("registerUser", () => {
    test("cadastra um usuário válido e adiciona à listagem", () => {
      const user = service.registerUser(ana.id, ana.name);

      expect(user).toMatchObject({ id: 1, name: "Ana" });
      expect(service.listUsers()).toHaveLength(1);
      expect(service.listUsers()[0].id).toBe(1);
    });

    test("lança erro com identificador inválido", () => {
      expect(() => service.registerUser(0, ana.name)).toThrow("Identificador inválido");
    });

    test.each(["1", NaN, Infinity, -1, 1.5])(
      "lança erro quando o identificador é inválido (%p)",
      (id) => {
        expect(() => service.registerUser(id, ana.name)).toThrow("Identificador inválido");
      }
    );

    test("lança erro ao cadastrar um usuário já existente", () => {
      service.registerUser(ana.id, ana.name);

      expect(() => service.registerUser(ana.id, bia.name)).toThrow("Usuário já cadastrado");
    });

    test("lança erro ao criar um usuário com identificador string", () => {
      expect(() => new User("1", ana.name)).toThrow("Identificador inválido");
    });

    test("lança erro ao criar um usuário com identificador não numérico", () => {
      expect(() => new User(NaN, ana.name)).toThrow("Identificador inválido");
    });

    test("lança erro ao criar um usuário com identificador infinito", () => {
      expect(() => new User(Number.POSITIVE_INFINITY, ana.name)).toThrow(
        "Identificador inválido"
      );
    });

    test("lança erro ao criar um usuário com identificador negativo", () => {
      expect(() => new User(-1, ana.name)).toThrow("Identificador inválido");
    });

    test("lança erro ao criar um usuário com identificador decimal", () => {
      expect(() => new User(1.5, ana.name)).toThrow("Identificador inválido");
    });
  });

  describe("User model", () => {
    test("cria um usuário válido com nome informado", () => {
      const user = new User(ana.id, ana.name);

      expect(user.id).toBe(1);
      expect(user.name).toBe("Ana");
      expect(user.loanCount()).toBe(0);
      expect(user.listLoans()).toEqual([]);
    });

    test("define nome vazio quando o nome não é informado", () => {
      const user = new User(ana.id);

      expect(user.name).toBe("");
    });

    test("registra empréstimo, verifica presença e conta os títulos", () => {
      const user = new User(ana.id, ana.name);

      user.borrow(bookDuna.title);

      expect(user.hasBorrowed("Duna")).toBe(true);
      expect(user.hasBorrowed("Clean Code")).toBe(false);
      expect(user.loanCount()).toBe(1);
    });

    test("remove um livro da lista de empréstimos e retorna a listagem atual", () => {
      const user = new User(ana.id, ana.name);
      user.borrow(bookDuna.title);
      user.borrow("Clean Code");

      user.return("Duna");

      expect(user.hasBorrowed("Duna")).toBe(false);
      expect(user.listLoans()).toEqual(["Clean Code"]);
    });
  });

  describe("listUsers", () => {
    test("retorna todos os usuários cadastrados", () => {
      service.registerUser(ana.id, ana.name);
      service.registerUser(bia.id, bia.name);

      const users = service.listUsers();

      expect(users).toHaveLength(2);
    });
  });

  describe("borrowBook", () => {
    test("empresta um livro disponível e reduz a quantidade do exemplar", () => {
      service.registerBook(bookDuna.title, bookDuna.author, bookDuna.quantity);
      service.registerUser(ana.id, ana.name);

      const result = service.borrowBook(ana.id, bookDuna.title);

      expect(result).toBe(true);
      expect(service.listBooks()[0].quantity).toBe(1);
      expect(service.listLoans(ana.id)).toEqual([bookDuna.title]);
    });

    test("lança erro quando o usuário não existe", () => {
      service.registerBook(bookDuna.title, bookDuna.author, 1);

      expect(() => service.borrowBook(ana.id, bookDuna.title)).toThrow("Usuário não encontrado");
    });

    test("lança erro quando o livro não existe", () => {
      service.registerUser(ana.id, ana.name);

      expect(() => service.borrowBook(ana.id, bookDuna.title)).toThrow("Livro não encontrado");
    });

    test("lança erro quando não há exemplares disponíveis", () => {
      service.registerBook(bookDuna.title, bookDuna.author, 1);
      service.registerUser(ana.id, ana.name);
      repo.books[0].quantity = 0;

      expect(() => service.borrowBook(ana.id, bookDuna.title)).toThrow("Nenhum exemplar disponível");
    });

    test("lança erro quando o usuário atinge o limite de 3 empréstimos", () => {
      service.registerUser(ana.id, ana.name);
      service.registerBook("Livro 1", "Autor 1", 1);
      service.registerBook("Livro 2", "Autor 2", 1);
      service.registerBook("Livro 3", "Autor 3", 1);
      service.registerBook("Livro 4", "Autor 4", 1);

      expect(service.borrowBook(ana.id, "Livro 1")).toBe(true)
      expect(service.borrowBook(ana.id, "Livro 2")).toBe(true)
      expect(service.borrowBook(ana.id, "Livro 3")).toBe(true)

      expect(() => service.borrowBook(ana.id, "Livro 4")).toThrow(
        "Usuário atingiu o limite de empréstimos (3)"
      );
    });

    test("lança erro quando o usuário já possui o mesmo livro emprestado", () => {
      service.registerUser(ana.id, ana.name);
      service.registerBook(bookDuna.title, bookDuna.author, 2);
      service.borrowBook(ana.id, bookDuna.title);

      expect(() => service.borrowBook(ana.id, bookDuna.title)).toThrow(
        "Usuário já tem esse livro emprestado"
      );
    });

    test("permite que outro usuário empreste o mesmo livro", () => {
      service.registerUser(ana.id, ana.name);
      service.registerUser(bia.id, bia.name);
      service.registerBook(bookDuna.title, bookDuna.author, 2);
      service.borrowBook(ana.id, bookDuna.title);

      const result = service.borrowBook(bia.id, bookDuna.title);

      expect(result).toBe(true);
      expect(service.listBooks()[0].quantity).toBe(0);
      expect(service.listLoans(ana.id)).toEqual(["Duna"]);
      expect(service.listLoans(bia.id)).toEqual(["Duna"]);
    });
  });

  describe("returnBook", () => {
    test("devolve um livro emprestado e aumenta a quantidade disponível", () => {
      service.registerBook(bookDuna.title, bookDuna.author, 1);
      service.registerUser(ana.id, ana.name);
      service.borrowBook(ana.id, bookDuna.title);

      const result = service.returnBook(ana.id, bookDuna.title);

      expect(result.title).toBe("Duna");
      expect(service.listBooks()[0].quantity).toBe(1);
      expect(service.listLoans(ana.id)).toEqual([]);
    });

    test("lança erro quando o usuário não existe", () => {
      service.registerBook(bookDuna.title, bookDuna.author, 1);

      expect(() => service.returnBook(ana.id, bookDuna.title)).toThrow("Usuário não encontrado");
    });

    test("lança erro quando o livro não existe", () => {
      service.registerUser(ana.id, ana.name);

      expect(() => service.returnBook(ana.id, bookDuna.title)).toThrow("Livro não encontrado");
    });

    test("lança erro quando o usuário não emprestou o livro", () => {
      service.registerBook(bookDuna.title, bookDuna.author, 1);
      service.registerUser(ana.id, ana.name);

      expect(() => service.returnBook(ana.id, bookDuna.title)).toThrow(
        "Usuário não emprestou este livro"
      );
    });

    test("lança erro quando a quantidade máxima de exemplares já foi atingida", () => {
      service.registerBook(bookDuna.title, bookDuna.author, 5);
      service.registerUser(ana.id, ana.name);
      service.borrowBook(ana.id, bookDuna.title);
      repo.books[0].quantity = 5;
      service.registerUser(bia.id, bia.name);
      repo.users[1].borrow(bookDuna.title);

      expect(() => service.returnBook(ana.id, bookDuna.title)).toThrow("Quantidade máxima atingida");
    });
  });

  describe("listLoans", () => {
    test("retorna a lista de livros emprestados do usuário", () => {
      service.registerUser(ana.id, ana.name);
      service.registerBook(bookDuna.title, bookDuna.author, 2);
      service.registerBook("Clean Code", "Robert C. Martin", 1);
      service.borrowBook(ana.id, bookDuna.title);
      service.borrowBook(ana.id, "Clean Code");

      expect(service.listLoans(ana.id)).toEqual([bookDuna.title, "Clean Code"]);
    });

    test("lança erro quando o usuário não existe", () => {
      expect(() => service.listLoans(ana.id)).toThrow("Usuário não encontrado");
    });

    test("não encontra o usuário quando o identificador é informado como texto", () => {
      service.registerUser(ana.id, ana.name);

      expect(() => service.listLoans("1")).toThrow("Usuário não encontrado");
    });
  });

  describe("datas de empréstimo e devolução (NF02)", () => {
    const dataEmprestimo = new Date("2026-03-01T10:00:00Z");

    beforeEach(() => {
      service.registerUser(ana.id, ana.name);
      service.registerBook(bookDuna.title, bookDuna.author, 2);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test("registra a data do empréstimo", () => {
      service.borrowBook(ana.id, bookDuna.title, dataEmprestimo);

      expect(service.listLoansWithDates(ana.id)).toEqual([
        { title: "Duna", date: new Date("2026-03-01T10:00:00Z") },
      ]);
    });

    test("usa a data atual quando a data do empréstimo não é informada", () => {
      jest.useFakeTimers({ now: new Date("2026-05-10T08:30:00Z") });

      service.borrowBook(ana.id, bookDuna.title);

      expect(service.listLoansWithDates(ana.id)).toEqual([
        { title: "Duna", date: new Date("2026-05-10T08:30:00Z") },
      ]);
    });

    test("informa as datas e 0 dias quando a devolução ocorre no mesmo dia", () => {
      service.borrowBook(ana.id, bookDuna.title, dataEmprestimo);

      const result = service.returnBook(ana.id, bookDuna.title, new Date("2026-03-01T18:00:00Z"));

      expect(result).toEqual({
        title: "Duna",
        borrowDate: new Date("2026-03-01T10:00:00Z"),
        returnDate: new Date("2026-03-01T18:00:00Z"),
        days: 0,
      });
      expect(service.listLoansWithDates(ana.id)).toEqual([]);
    });

    test("calcula os dias completos de um empréstimo de vários dias", () => {
      service.borrowBook(ana.id, bookDuna.title, dataEmprestimo);

      const result = service.returnBook(ana.id, bookDuna.title, new Date("2026-03-11T15:00:00Z"));

      expect(result.days).toBe(10);
    });

    test.each([
      ["2026-03-02T09:59:59.999Z", 0],
      ["2026-03-02T10:00:00.000Z", 1],
    ])("calcula os dias no limite de 24 horas (devolução em %s → %p dias)", (dataDevolucao, dias) => {
      service.borrowBook(ana.id, bookDuna.title, dataEmprestimo);

      const result = service.returnBook(ana.id, bookDuna.title, new Date(dataDevolucao));

      expect(result.days).toBe(dias);
    });

    test("lança erro quando a data de devolução é anterior à do empréstimo", () => {
      service.borrowBook(ana.id, bookDuna.title, dataEmprestimo);

      expect(() =>
        service.returnBook(ana.id, bookDuna.title, new Date("2026-03-01T09:59:59Z"))
      ).toThrow("Data de devolução inválida");
      expect(service.listBooks()[0].quantity).toBe(1);
      expect(service.listLoans(ana.id)).toEqual(["Duna"]);
    });

    test("lança erro ao consultar datas de um usuário inexistente", () => {
      expect(() => service.listLoansWithDates(bia.id)).toThrow("Usuário não encontrado");
    });
  });
});
