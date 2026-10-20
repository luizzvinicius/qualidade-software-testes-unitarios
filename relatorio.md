# Relatório — Testes no R Book Lib

**Integrantes:**

1. João Victor Zignago
2. Luiz Vinícius
3. 
4. 

**Evoluções implementadas:** (por exemplo, NF02 e NF01)

**Resultado final dos testes:** cole aqui as duas últimas linhas da saída de `npm test` (`Test Suites` e `Tests`).

```
tests\library-service.test.js:
✓ LibraryService > registerBook > registra um livro válido e mantém a quantidade disponível atualizada [0.28ms]
✓ LibraryService > registerBook > registra um livro com 1 exemplar quando a quantidade não é informada [0.04ms]
✓ LibraryService > registerBook > lança erro ao cadastrar um livro já existente [0.10ms]
✓ LibraryService > registerBook > lança erro ao cadastrar um livro já existente com título em caixa diferente [0.05ms]
✓ LibraryService > registerBook > registra um livro com a quantidade limite de exemplares (1) [0.04ms]
✓ LibraryService > registerBook > registra um livro com a quantidade limite de exemplares (5) [0.01ms]
✓ LibraryService > registerBook > lança erro quando a quantidade de exemplares ultrapassa o limite [0.04ms]
✓ LibraryService > registerBook > lança erro ao criar um livro com quantidade inválida (0) [0.03ms]
✓ LibraryService > registerBook > lança erro ao criar um livro com quantidade inválida (-1) [0.01ms]
✓ LibraryService > registerBook > usa o nome 'Desconhecido' quando o autor não é informado [0.04ms]
✓ LibraryService > Book model > cria um livro com título e quantidade válidos [0.04ms]
✓ LibraryService > Book model > lança erro ao criar um livro título vazio [0.04ms]
✓ LibraryService > Book model > lança erro ao criar um livro com título não string [0.04ms]
✓ LibraryService > Book model > lança erro ao criar um livro com quantidade decimal [0.05ms]
✓ LibraryService > listBooks > retorna todos os livros cadastrados em ordem de cadastro [0.19ms]
✓ LibraryService > searchBooks (NF01) > encontra o livro pelo título exato [0.26ms]
✓ LibraryService > searchBooks (NF01) > encontra os livros pela parte do título [0.07ms]
✓ LibraryService > searchBooks (NF01) > encontra os livros pela parte do nome do autor [0.05ms]
✓ LibraryService > searchBooks (NF01) > encontra os livros sem diferenciar maiúsculas e minúsculas ("DUNA") [0.80ms]
✓ LibraryService > searchBooks (NF01) > encontra os livros sem diferenciar maiúsculas e minúsculas ("duna") [0.26ms]
✓ LibraryService > searchBooks (NF01) > encontra os livros sem diferenciar maiúsculas e minúsculas ("dUnA") [0.06ms]
✓ LibraryService > searchBooks (NF01) > devolve lista vazia quando nenhum livro corresponde ao termo [0.06ms]
✓ LibraryService > searchBooks (NF01) > devolve lista vazia quando o termo é vazio ("") [0.03ms]
✓ LibraryService > searchBooks (NF01) > devolve lista vazia quando o termo é vazio ("   ") [0.02ms]
✓ LibraryService > searchBooks (NF01) > devolve lista vazia quando o termo é vazio (undefined) [0.01ms]
✓ LibraryService > removeBook > remove um livro do acervo quando todos os exemplares estão disponíveis (não emprestados) [0.10ms]
✓ LibraryService > removeBook > lança erro quando o livro não existe [0.05ms]
✓ LibraryService > removeBook > lança erro quando há exemplares emprestados [0.21ms]
✓ LibraryService > registerUser > cadastra um usuário válido e adiciona à listagem [0.06ms]
✓ LibraryService > registerUser > lança erro com identificador inválido [0.03ms]
✓ LibraryService > registerUser > lança erro quando o identificador é inválido ("1") [0.03ms]
✓ LibraryService > registerUser > lança erro quando o identificador é inválido (NaN) [0.01ms]
✓ LibraryService > registerUser > lança erro quando o identificador é inválido (Infinity) [0.01ms]
✓ LibraryService > registerUser > lança erro quando o identificador é inválido (-1) [0.02ms]
✓ LibraryService > registerUser > lança erro quando o identificador é inválido (1.5) [0.02ms]
✓ LibraryService > registerUser > lança erro ao cadastrar um usuário já existente [0.06ms]
✓ LibraryService > registerUser > lança erro ao criar um usuário com identificador string [0.05ms]
✓ LibraryService > registerUser > lança erro ao criar um usuário com identificador não numérico [0.03ms]
✓ LibraryService > registerUser > lança erro ao criar um usuário com identificador infinito [0.03ms]
✓ LibraryService > registerUser > lança erro ao criar um usuário com identificador negativo [0.05ms]
✓ LibraryService > registerUser > lança erro ao criar um usuário com identificador decimal [0.03ms]
✓ LibraryService > User model > cria um usuário válido com nome informado [0.19ms]
✓ LibraryService > User model > define nome vazio quando o nome não é informado [0.02ms]
✓ LibraryService > User model > registra empréstimo, verifica presença e conta os títulos [0.04ms]
✓ LibraryService > User model > remove um livro da lista de empréstimos e retorna a listagem atual [0.06ms]
✓ LibraryService > listUsers > retorna todos os usuários cadastrados [0.03ms]
✓ LibraryService > borrowBook > empresta um livro disponível e reduz a quantidade do exemplar [0.06ms]
✓ LibraryService > borrowBook > lança erro quando o usuário não existe [0.04ms]
✓ LibraryService > borrowBook > lança erro quando o livro não existe [0.03ms]
✓ LibraryService > borrowBook > lança erro quando não há exemplares disponíveis [0.07ms]
✓ LibraryService > borrowBook > lança erro quando o usuário atinge o limite de 3 empréstimos [0.11ms]
✓ LibraryService > borrowBook > lança erro quando o usuário já possui o mesmo livro emprestado [0.06ms]
✓ LibraryService > borrowBook > permite que outro usuário empreste o mesmo livro [0.08ms]
✓ LibraryService > returnBook > devolve um livro emprestado e aumenta a quantidade disponível [0.23ms]
✓ LibraryService > returnBook > lança erro quando o usuário não existe [0.08ms]
✓ LibraryService > returnBook > lança erro quando o livro não existe [0.07ms]
✓ LibraryService > returnBook > lança erro quando o usuário não emprestou o livro [0.07ms]
✓ LibraryService > returnBook > lança erro quando a quantidade máxima de exemplares já foi atingida [0.06ms]
✓ LibraryService > listLoans > retorna a lista de livros emprestados do usuário [0.04ms]
✓ LibraryService > listLoans > lança erro quando o usuário não existe [0.04ms]
✓ LibraryService > listLoans > não encontra o usuário quando o identificador é informado como texto [0.04ms]
✓ LibraryService > datas de empréstimo e devolução (NF02) > registra a data do empréstimo [0.20ms]
✓ LibraryService > datas de empréstimo e devolução (NF02) > usa a data atual quando a data do empréstimo não é informada [0.09ms]
✓ LibraryService > datas de empréstimo e devolução (NF02) > informa as datas e 0 dias quando a devolução ocorre no mesmo dia [0.06ms]
✓ LibraryService > datas de empréstimo e devolução (NF02) > calcula os dias completos de um empréstimo de vários dias [0.04ms]
✓ LibraryService > datas de empréstimo e devolução (NF02) > calcula os dias no limite de 24 horas (devolução em 2026-03-02T09:59:59.999Z → 0 dias) [0.05ms]
✓ LibraryService > datas de empréstimo e devolução (NF02) > calcula os dias no limite de 24 horas (devolução em 2026-03-02T10:00:00.000Z → 1 dias) [0.02ms]
✓ LibraryService > datas de empréstimo e devolução (NF02) > lança erro quando a data de devolução é anterior à do empréstimo [0.08ms]
✓ LibraryService > datas de empréstimo e devolução (NF02) > lança erro ao consultar datas de um usuário inexistente [0.06ms]

 69 pass
 0 fail
 100 expect() calls
Ran 69 tests across 1 file. [18.00ms]
```

---

## 1. Defeitos encontrados

Liste os defeitos do código original que os testes do grupo revelaram. Se não encontraram nenhum, escreva "nenhum" e explique quais regras conferiram com mais cuidado.

| Regra | Teste que revela o defeito (nome e arquivo) | Comportamento esperado | Comportamento obtido | Correção feita (arquivo e resumo) |
|---|---|---|---|---|
| Quantidade mínima e máxima de exemplares | lança erro quando a quantidade de exemplares ultrapassa o limite | Exceção ser lançada quando ultrapassar a quantidade máxima | Não é possível criar um livro se a quantidade de exemplares for maior que a quantidade permitida | Adicionada verificação no parâmetro quantidade e remoção do fallback |
| Criação de ids únicos para usuários | Todos os testes do describe registerUser | Criar usuários com id apenas numéricos | Programa lança exceção caso um id não numérico ou inválido seja digitado | Adicionada validação para verificação do input ser numérico e positivo
---

## 2. Testabilidade

**a)** Na evolução com data, de que o código dependia para funcionar? Como essa dependência passou a ser recebida, e como os testes a controlam? Cite a assinatura do método e o nome de um teste.

> O método borrow passou a receber date como parâmetro e a estrutura de armazenamento passou de um Set para um Map. Além disso existem alguns testes que garantem o comportamento desse método, como por exemplo: "registra empréstimo, verifica presença e conta os títulos".


**b)** Aponte um trecho do projeto **original** em que a regra de negócio já estava separada da interface, e explique por que isso facilitou escrever os testes da Parte 1.

> No projeto original, o método borrowBook do LibraryService já reunia todas as regras do empréstimo sem usar prompt nem console.log. Ele recebia os dados por parâmetro e lançava um erro quando alguma regra era violada.

---

## 3. Cobertura

Cole a tabela exibida por `npm run coverage`.

```bash
--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |     100 |      100 |     100 |     100 |                   
 models                   |     100 |      100 |     100 |     100 |                   
  book.js                 |     100 |      100 |     100 |     100 |                   
  user.js                 |     100 |      100 |     100 |     100 |                   
 repo                     |     100 |      100 |     100 |     100 |                   
  in-memory-repository.js |     100 |      100 |     100 |     100 |                   
 services                 |     100 |      100 |     100 |     100 |                   
  library-service.js      |     100 |      100 |     100 |     100 |                   
--------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       69 passed, 69 total
Snapshots:   0 total
Time:        0.71 s, estimated 1 s
```

Para cada trecho não coberto (coluna `Uncovered Line #s`), explique o que é e por que ficou sem teste.

| Arquivo e linha | O que o trecho faz | Por que não foi coberto |
|---|---|---|
|  |  |  |

---

## 4. O que ficou sem teste, e por quê

Liste as partes do sistema que a suíte do grupo **não** verifica (arquivos, funções ou comportamentos) e explique o motivo de cada uma. Que tipo de erro poderia passar despercebido?

> Não existe arquivo que não esteja coberto por algum teste.
