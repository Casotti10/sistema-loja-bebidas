# Documento de Requisitos — Bebida Loja

> **Fase 1 — Planejamento**
> Última atualização: 2026-06-22

Este documento define **o que** o sistema precisa fazer (requisitos funcionais) e
**como** ele deve se comportar em termos de qualidade (requisitos não-funcionais).
Ele é a base para todas as decisões de arquitetura e desenvolvimento.

---

## 1. Visão do Produto

Uma loja virtual onde o cliente navega por um catálogo de bebidas, monta um carrinho,
faz login/cadastro, finaliza a compra pagando com PIX e acompanha seus pedidos.
A loja gerencia produtos, estoque e pedidos por um painel administrativo.

Por se tratar da venda de **bebida alcoólica**, o sistema deve garantir a
**verificação de maioridade** do cliente.

---

## 2. Atores do Sistema

Atores são os "papéis" que interagem com o sistema.

| Ator | Descrição |
|------|-----------|
| **Visitante** | Navega pelo catálogo sem estar logado |
| **Cliente** | Visitante que se cadastrou; pode comprar e acompanhar pedidos |
| **Administrador** | Funcionário da loja; gerencia produtos, estoque e pedidos |

---

## 3. Escopo do MVP (Versão 1)

### ✅ Dentro do MVP

1. Catálogo de produtos com categorias, busca e filtros básicos
2. Página de detalhe do produto (imagens, preço, estoque)
3. Carrinho de compras
4. Cadastro e login de cliente **com verificação de maioridade (18+)**
5. Checkout com entrega (delivery) **ou** retirada na loja
6. Pagamento via **PIX** (online) ou **pagamento na entrega**
7. Histórico de pedidos do cliente
8. Painel administrativo mínimo: cadastro de produtos e visualização de pedidos

### ⏳ Fora do MVP (versões futuras)

- Área VIP (assinaturas, ofertas relâmpago, produtos exclusivos)
- Cartão de crédito, Apple Pay, Google Pay
- Favoritos e cupons de desconto
- Recuperação de senha por e-mail
- Impressão térmica de comprovantes
- PWA (instalação como app)
- Cálculo de frete por distância/CEP

---

## 4. Requisitos Funcionais (RF)

> Convenção: cada requisito tem um código (RF-XX) para podermos referenciá-lo
> em commits, tarefas e testes. Isso é prática de mercado (rastreabilidade).

### Catálogo
- **RF-01** — O sistema deve listar produtos com nome, preço, imagem e disponibilidade.
- **RF-02** — O sistema deve organizar produtos por categorias (ex: cervejas, vinhos, destilados, não alcoólicos).
- **RF-03** — O visitante deve poder buscar produtos por nome.
- **RF-04** — O visitante deve poder filtrar produtos por categoria e faixa de preço.
- **RF-05** — O sistema deve exibir uma página de detalhe com mais informações do produto.

### Carrinho
- **RF-06** — O cliente deve poder adicionar/remover produtos do carrinho e alterar quantidades.
- **RF-07** — O carrinho deve calcular o subtotal automaticamente.
- **RF-08** — O sistema não deve permitir comprar quantidade maior que o estoque disponível.

### Conta do Cliente
- **RF-09** — O visitante deve poder se cadastrar com nome, e-mail, senha e data de nascimento.
- **RF-10** — O sistema deve **bloquear o cadastro de menores de 18 anos** (verificação de maioridade).
- **RF-11** — O cliente deve poder fazer login e logout.
- **RF-12** — O cliente deve poder cadastrar endereços de entrega.
- **RF-13** — O cliente deve poder ver o histórico dos seus pedidos.

### Checkout e Pedido
- **RF-14** — O cliente deve escolher entre **entrega** ou **retirada na loja**.
- **RF-15** — Em caso de entrega, o cliente deve informar/escolher um endereço.
- **RF-16** — O cliente deve escolher a forma de pagamento (PIX online ou na entrega).
- **RF-17** — O sistema deve gerar um pedido com status (ex: aguardando pagamento, pago, em separação, a caminho, entregue).
- **RF-18** — Ao confirmar o pedido, o estoque dos produtos deve ser reduzido.

### Administração
- **RF-19** — O administrador deve poder cadastrar, editar e desativar produtos.
- **RF-20** — O administrador deve poder controlar o estoque de cada produto.
- **RF-21** — O administrador deve poder visualizar e atualizar o status dos pedidos.

---

## 5. Requisitos Não-Funcionais (RNF)

> Aqui mora a diferença entre um sistema amador e um profissional.

### Segurança
- **RNF-01** — Senhas devem ser armazenadas com **hash** (nunca em texto puro).
- **RNF-02** — Dados de pagamento **nunca** devem ser armazenados no nosso banco; usaremos um gateway (Fase 6).
- **RNF-03** — O sistema deve registrar e exigir a **confirmação de maioridade** antes de concluir uma compra.
- **RNF-04** — Áreas administrativas só podem ser acessadas por usuários com papel de administrador.

### Performance
- **RNF-05** — Páginas principais (catálogo, produto) devem carregar em até ~2s em conexão comum.
- **RNF-06** — A busca deve responder de forma fluida mesmo com centenas de produtos.

### Usabilidade e Compatibilidade
- **RNF-07** — A interface deve ser **responsiva**: funcionar bem em desktop, tablet e celular.
- **RNF-08** — Mensagens de erro devem ser claras e em português.

### Legais (específicos de bebida alcoólica)
- **RNF-09** — O sistema deve exibir aviso de venda proibida para menores de 18 anos.
- **RNF-10** — A arquitetura deve permitir, no futuro, restrição de horário de venda conforme legislação municipal.

### Manutenibilidade
- **RNF-11** — O código deve seguir boas práticas (Clean Code, separação de responsabilidades).
- **RNF-12** — O projeto deve ser versionado no Git com histórico de commits claro.

---

## 6. Premissas e Decisões de Negócio (a confirmar)

Estas são as decisões assumidas como padrão. **Devem ser confirmadas pelo dono da loja.**

| # | Tema | Decisão assumida |
|---|------|------------------|
| 1 | Entrega | Delivery e retirada, com frete simples (taxa fixa) no MVP |
| 2 | Pagamento | PIX online + pagamento na entrega |
| 3 | Objetivo do projeto | Tratado como projeto real (rigor de produção) |
| 4 | Área VIP | Fora do MVP |

---

## 7. Fora de Escopo (todo o projeto)

Para deixar claro o que o sistema **não** vai fazer (evita mal-entendidos):

- Não é um marketplace (uma loja só, não vários vendedores).
- Não faz gestão fiscal/emissão de nota fiscal no MVP.
- Não faz gestão financeira/contábil da loja.
