INSTITUTO FEDERAL DE ALAGOAS – IFAL / CAMPUS MACEIÓ

Curso Bacharelado em Sistemas de Informação

Disciplina de Qualidade de Software

Prof. MSc. Ricardo Nunes

Ricardo (arroba) ifal.edu.br

# Histórias de Usuário — Sistema de Biblioteca R Book Lib (Versão Atual)

## Épico 1 — Gerenciamento de Livros

### HU01 — Cadastrar novo livro

**Como** operador da biblioteca **Quero** cadastrar um novo livro com título, autor e quantidade **Para** disponibilizá-lo para empréstimos.

**Passos:**

1. O operador escolhe a opção “Cadastrar livro” no menu.
2. O sistema solicita: título, autor e quantidade.
3. O operador informa os dados.
4. O sistema valida o título e a quantidade e verifica se o título não está cadastrado.
5. O sistema cria o livro e adiciona ao repositório em memória.
6. Exibe mensagem de confirmação: “Livro cadastrado”.

**Critérios de aceitação:**

- Não é permitido cadastrar livros sem título.
- Não é permitido cadastrar quantidade menor ou igual a zero.
- Não é permitido cadastrar mais de 5 exemplares.
- Não é permitido cadastrar dois livros com o mesmo título, ignorando maiúsculas e minúsculas.
- Ao cadastrar com sucesso, o livro aparece na listagem.

### HU02 — Listar livros cadastrados

**Como** operador da biblioteca **Quero** visualizar todos os livros cadastrados **Para** acompanhar os títulos e quantidades disponíveis.

**Passos:**

1. O operador seleciona a opção “Listar livros”.
2. O sistema mostra lista com: título, autor e quantidade disponível.

**Critérios de aceitação:**

- A lista deve conter todos os livros cadastrados.
- Cada linha deve exibir: título, autor e quantidade atual.
- Quando não houver livros, exibir mensagem clara (ex: “Nenhum livro cadastrado”).

### HU03 — Remover livro do acervo

**Como** operador da biblioteca **Quero** remover um livro do sistema **Para** manter o acervo atualizado.

**Passos:**

1. O operador escolhe a opção “Remover livro”.
2. O sistema solicita o título.
3. O sistema verifica se o livro existe e se todos os exemplares estão disponíveis.
4. Caso positivo, o sistema remove o livro.
5. Exibe mensagem “Livro removido”.

**Critérios de aceitação:**

- O livro deve existir.
- Todos os exemplares devem estar disponíveis (sem empréstimos ativos).
- Se o livro não existir, mostrar erro: “Livro não encontrado”.
- Se houver empréstimos ativos, mostrar erro: “Não é possível remover: há exemplares emprestados”.

## Épico 2 — Gerenciamento de Usuários

### HU04 — Cadastrar usuário

**Como** operador da biblioteca **Quero** cadastrar novos usuários **Para** permitir que realizem empréstimos de livros.

**Passos:**

1. O operador escolhe “Cadastrar usuário”.
2. O sistema solicita: ID e nome.
3. O sistema valida se o ID não está cadastrado.
4. O usuário é adicionado à base de dados em memória.
5. Exibe mensagem “Usuário cadastrado”.

**Critérios de aceitação:**

- O ID é obrigatório e único.
- O nome pode ser opcional.
- IDs duplicados devem gerar erro: “Usuário já cadastrado”.
- Após cadastro, o usuário aparece na listagem.

### HU05 — Listar usuários

**Como** operador da biblioteca **Quero** visualizar todos os usuários cadastrados **Para** verificar quem tem acesso à biblioteca.

**Passos:**

1. O operador seleciona “Listar usuários”.
2. O sistema mostra ID e nome de cada usuário.

**Critérios de aceitação:**

- Todos os usuários cadastrados devem ser exibidos.
- Quando não houver usuários, exibir mensagem adequada (“Nenhum usuário cadastrado”).

## Épico 3 — Empréstimos de Livros

### HU06 — Realizar empréstimo de livro

**Como** operador da biblioteca **Quero** registrar o empréstimo de um livro para um usuário **Para** controlar os livros emprestados e disponíveis.

**Passos:**

1. O operador seleciona “Emprestar livro”.
2. O sistema solicita ID do usuário e título do livro.
3. O sistema valida existência do usuário e do livro.
4. Verifica se há exemplares disponíveis.
5. Verifica se o usuário ainda não emprestou o mesmo livro e se não atingiu o limite de 3 empréstimos.
6. Caso todas as regras sejam satisfeitas, o empréstimo é registrado.
7. Exibe “Empréstimo realizado.”

**Critérios de aceitação:**

- O livro e o usuário devem existir.
- O livro deve ter ao menos 1 exemplar disponível.
- O usuário não pode ter mais de 3 empréstimos ativos.
- O usuário não pode pegar o mesmo livro duas vezes.
- A quantidade disponível do livro deve diminuir em 1.

### HU07 — Devolver livro emprestado

**Como** operador da biblioteca **Quero** registrar a devolução de um livro **Para** liberar o exemplar para novos empréstimos.

**Passos:**

1. O operador seleciona “Devolver livro”.
2. O sistema solicita ID do usuário e título do livro.
3. O sistema valida existência do usuário e do livro.
4. Verifica se o usuário realmente possui aquele livro emprestado.
5. Caso positivo, o sistema registra a devolução.
6. Exibe “Devolução realizada.”

**Critérios de aceitação:**

- O usuário deve existir e ter o livro emprestado.
- A quantidade disponível do livro deve aumentar em 1.
- Não é permitido ultrapassar a quantidade cadastrada do livro.
- Erros adequados devem ser exibidos para casos inválidos.

### HU08 — Listar empréstimos de um usuário

**Como** operador da biblioteca **Quero** consultar quais livros um usuário tem emprestados **Para** acompanhar e controlar as devoluções.

**Passos:**

1. O operador escolhe “Listar empréstimos de usuário”.
2. O sistema solicita o ID do usuário.
3. O sistema busca o usuário e lista os títulos emprestados.

**Critérios de aceitação:**

- O usuário deve existir.
- A lista deve conter todos os títulos atualmente emprestados.
- Caso não haja empréstimos, exibir “(nenhum)”.

## Épico 4 — Encerramento do Sistema

### HU09 — Encerrar execução

**Como** operador da biblioteca **Quero** sair do sistema **Para** finalizar o programa com segurança.

**Passos:**

1. O operador escolhe a opção “0. Sair”.
2. O sistema exibe mensagem de despedida.
3. O programa é encerrado.

**Critérios de aceitação:**

- Encerramento deve ocorrer de forma limpa, sem exceções.
- Dados não são persistidos — ao reiniciar, a memória é limpa.
