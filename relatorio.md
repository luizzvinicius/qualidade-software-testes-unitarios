# Relatório — Testes no R Book Lib

**Integrantes:**

1. João Victor Zignago
2. Luiz Vinícius
3. 
4. 

**Evoluções implementadas:** (por exemplo, NF02 e NF01)

**Resultado final dos testes:** cole aqui as duas últimas linhas da saída de `npm test` (`Test Suites` e `Tests`).

```

```

---

## 1. Defeitos encontrados

Liste os defeitos do código original que os testes do grupo revelaram. Se não encontraram nenhum, escreva "nenhum" e explique quais regras conferiram com mais cuidado.

| Regra | Teste que revela o defeito (nome e arquivo) | Comportamento esperado | Comportamento obtido | Correção feita (arquivo e resumo) |
|---|---|---|---|---|
| Quantidade mínima e máxima de exemplares | lança erro quando a quantidade de exemplares ultrapassa o limite | Exceção ser lançada quando ultrapassar a quantidade máxima | Não é possível criar um livro se a quantidade de exemplares for maior que a quantidade permitida | Adicionada verificação no parâmtro quantidade |
| Criação de ids únicos para usuários | Todos os testes do describe registerUser | Criar usuários com id apenas numéricos | Programa lança exceção caso um id não numérico ou inválido seja digitado | Adicionada validação para verificação do input ser numérico e positivo

---

## 2. Testabilidade

**a)** Na evolução com data, de que o código dependia para funcionar? Como essa dependência passou a ser recebida, e como os testes a controlam? Cite a assinatura do método e o nome de um teste.

> 

**b)** Aponte um trecho do projeto **original** em que a regra de negócio já estava separada da interface, e explique por que isso facilitou escrever os testes da Parte 1.

> 

---

## 3. Cobertura

Cole a tabela exibida por `npm run coverage`.

```

```

Para cada trecho não coberto (coluna `Uncovered Line #s`), explique o que é e por que ficou sem teste.

| Arquivo e linha | O que o trecho faz | Por que não foi coberto |
|---|---|---|
|  |  |  |

---

## 4. O que ficou sem teste, e por quê

Liste as partes do sistema que a suíte do grupo **não** verifica (arquivos, funções ou comportamentos) e explique o motivo de cada uma. Que tipo de erro poderia passar despercebido?

> 
