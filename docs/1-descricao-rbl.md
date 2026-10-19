INSTITUTO FEDERAL DE ALAGOAS – IFAL / CAMPUS MACEIÓ

Curso Bacharelado em Sistemas de Informação

Disciplina de Qualidade de Software

Prof. MSc. Ricardo Nunes

Ricardo (arroba) ifal.edu.br

# Sistema Biblioteca - R Book Lib

## 1. Descrição Geral

### Objetivo do Sistema

O Sistema Biblioteca R Book Lib tem como objetivo gerenciar uma pequena biblioteca, permitindo o cadastro de livros e usuários, além de realizar e controlar empréstimos e devoluções de livros de forma simples, utilizando interface via console e armazenamento em memória.

### Escopo Atual

O sistema cobre as seguintes funcionalidades:

- Cadastro, listagem e remoção de livros.
- Cadastro e listagem de usuários.
- Empréstimo e devolução de livros.
- Exibição dos empréstimos por usuário.

A interação ocorre exclusivamente via console, e os dados são armazenados em estruturas de dados em memória (arrays e objetos), sem persistência externa (não há banco de dados real).

## 2. Regras de Negócio

Este documento é a referência do comportamento correto do sistema. Se o código se comportar de forma diferente do que está descrito aqui, o defeito está no código.

| Regra | Descrição |
| --- | --- |
| RN01 - Cadastro único de livros | Todo livro tem um título. Não é permitido cadastrar dois livros com o mesmo título. A comparação ignora maiúsculas e minúsculas: "Dom Casmurro" e "DOM CASMURRO" são o mesmo título. |
| RN02 - Quantidade mínima e máxima de exemplares | Cada livro é cadastrado com 1 a 5 exemplares (quantidade inteira). Quando a quantidade não é informada, o livro é cadastrado com 1 exemplar. A devolução não pode fazer a quantidade disponível ultrapassar a quantidade cadastrada. |
| RN03 - Cadastro único de usuários | Cada usuário deve ter um identificador (id) obrigatório e único. O nome é opcional. |
| RN04 - Limite de empréstimos | Um usuário pode ter no máximo 3 livros emprestados simultaneamente. |
| RN05 - Empréstimo duplicado proibido | O mesmo usuário não pode ter emprestado, ao mesmo tempo, dois exemplares do mesmo livro. |
| RN06 - Remoção de livro com empréstimos ativos proibida | Um livro só pode ser removido se todos os exemplares estiverem disponíveis. |
| RN07 - Devolução válida | Só é possível devolver um livro que o usuário tenha emprestado. |
| RN08 - Usuários e livros devem existir | Empréstimos, devoluções, remoções e consultas exigem que o usuário e o livro informados existam. Só é possível emprestar um livro que tenha ao menos 1 exemplar disponível. |

### 2.1 Operações e mensagens de erro

As operações são métodos do `LibraryService`. Em caso de violação de uma regra, o método lança um erro (`Error`) com a mensagem indicada.

| Operação | Em caso de sucesso | Situação de erro | Mensagem |
| --- | --- | --- | --- |
| `registerBook(title, author, quantity)` | Devolve o livro cadastrado. Sem autor, o livro fica com autor "Desconhecido" | Título ausente | Título inválido |
| | | Quantidade zero, negativa ou não inteira | Quantidade deve ser positiva |
| | | Quantidade maior que 5 | Quantidade máxima é 5 exemplares |
| | | Título já cadastrado | Livro já existe na biblioteca |
| `listBooks()` | Devolve a lista de livros, cada um com `title`, `author` e `quantity` (exemplares disponíveis) | — | — |
| `removeBook(title)` | Remove o livro e devolve `true` | Livro inexistente | Livro não encontrado |
| | | Há exemplares emprestados | Não é possível remover: há exemplares emprestados |
| `registerUser(id, name)` | Devolve o usuário cadastrado. Sem nome, o usuário fica com nome vazio | Identificador ausente | Identificador inválido |
| | | Identificador já cadastrado | Usuário já cadastrado |
| `listUsers()` | Devolve a lista de usuários, cada um com `id` e `name` | — | — |
| `borrowBook(userId, title)` | Diminui em 1 a quantidade disponível e registra o empréstimo | Usuário inexistente | Usuário não encontrado |
| | | Livro inexistente | Livro não encontrado |
| | | Nenhum exemplar disponível | Nenhum exemplar disponível |
| | | Usuário já tem 3 empréstimos | Usuário atingiu o limite de empréstimos (3) |
| | | Usuário já tem esse livro | Usuário já tem esse livro emprestado |
| `returnBook(userId, title)` | Aumenta em 1 a quantidade disponível e remove o empréstimo | Usuário inexistente | Usuário não encontrado |
| | | Livro inexistente | Livro não encontrado |
| | | Usuário não tem esse livro | Usuário não emprestou este livro |
| | | Quantidade ultrapassaria a cadastrada | Quantidade máxima atingida |
| `listLoans(userId)` | Devolve a lista de títulos emprestados ao usuário (vazia, se não houver) | Usuário inexistente | Usuário não encontrado |

Não há uma ordem definida para o caso em que duas situações de erro ocorrem ao mesmo tempo. Nos testes, provoque uma situação de erro de cada vez.

## 3. Requisitos do Sistema

### 3.1 Requisitos Funcionais

| ID | Requisito | Descrição |
| --- | --- | --- |
| RF01 | Cadastrar Livro | Permite registrar um novo livro com título, autor e quantidade. |
| RF02 | Listar Livros | Exibe todos os livros cadastrados e suas quantidades disponíveis. |
| RF03 | Remover Livro | Exclui um livro, desde que não haja exemplares emprestados. |
| RF04 | Cadastrar Usuário | Adiciona um novo usuário à biblioteca com ID e nome. |
| RF05 | Listar Usuários | Exibe todos os usuários cadastrados. |
| RF06 | Emprestar Livro | Registra o empréstimo de um livro para um usuário, respeitando regras de negócio. |
| RF07 | Devolver Livro | Registra a devolução de um livro por um usuário. |
| RF08 | Listar Empréstimos de Usuário | Exibe os títulos atualmente emprestados a um usuário. |

### 3.2 Requisitos Não Funcionais

| Categoria | Requisito |
| --- | --- |
| Usabilidade | Interface via console simples, orientada por menus numéricos. |
| Desempenho | Todas as operações são executadas em memória, garantindo resposta imediata. |
| Persistência | Não há persistência — os dados são perdidos ao encerrar o programa. |
| Segurança | Não há autenticação ou autorização. Entradas inválidas são tratadas com exceções. |
| Portabilidade | Executa em qualquer ambiente com Node.js. |
| Testabilidade | Código modular, com separação clara entre camadas (modelos, repositório, serviço e interface), permitindo testes unitários no LibraryService. |

## 4. Modelo C4 (adaptado)

### 4.1 Nível 1 — Contexto

Sistema: R Book Lib Atores:

- Usuário (Operador): interage via terminal, gerencia livros e empréstimos.
- Sistema de Biblioteca R Book Lib: executa as operações de registro, consulta, empréstimo e devolução.

[Usuário] → [Sistema de Biblioteca R Book Lib]

### 4.2 Nível 2 — Containers

| Container | Arquivo | Função | Tipo / Tecnologia |
| --- | --- | --- | --- |
| Aplicação | `src/app.js` | Ponto de entrada e controle do fluxo principal | Node.js (script) |
| Interface de console | `src/ui/console-ui.js` | Interface de entrada e saída de dados | prompt-sync / console |
| LibraryService | `src/services/library-service.js` | Camada de regras de negócio e validações | Classe JS |
| InMemoryRepository | `src/repo/in-memory-repository.js` | Camada de acesso a dados (em memória) | Classe JS |
| Book / User | `src/models/book.js`, `src/models/user.js` | Modelos de domínio (entidades) | Classes JS |

Fluxo:

Usuário → console-ui → app.js → LibraryService → InMemoryRepository → Modelos (Book, User)

O LibraryService recebe o repositório como parâmetro do construtor. Para usá-lo em um teste, basta criar um repositório novo:

```js
import { InMemoryRepository } from "../src/repo/in-memory-repository.js";
import { LibraryService } from "../src/services/library-service.js";

const service = new LibraryService(new InMemoryRepository());
```

### 4.3 Nível 3 — Componentes (da camada LibraryService)

| Componente | Responsabilidade |
| --- | --- |
| Book Management | Cadastrar, listar e remover livros |
| User Management | Cadastrar e listar usuários |
| Loan Management | Emprestar e devolver livros; consultar empréstimos |
| Validation & Rules | Verificar existência, limites e consistência de dados |
