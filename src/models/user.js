// models/user.js
export class User {
  constructor(id, name) {
    if (typeof id !== "number" || Number.isNaN(id) || !Number.isFinite(id) || id <= 0) {
      throw new Error("Identificador inválido");
    }
    this.id = id;
    this.name = name || "";
    // loans é um Map com os títulos emprestados e a data de cada empréstimo
    this.loans = new Map();
  }

  borrow(title, date = new Date()) {
    this.loans.set(title, date);
  }

  hasBorrowed(title) {
    return this.loans.has(title);
  }

  loanDate(title) {
    return this.loans.get(title);
  }

  return(title) {
    this.loans.delete(title);
  }

  loanCount() {
    return this.loans.size;
  }

  listLoans() {
    return Array.from(this.loans.keys());
  }

  listLoansWithDates() {
    return Array.from(this.loans, ([title, date]) => ({ title, date }));
  }
}
