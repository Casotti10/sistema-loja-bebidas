# Casos de Uso — Bebida Loja

> **Fase 1 — Planejamento**
> Última atualização: 2026-06-22

Um **caso de uso** descreve, passo a passo, como um ator atinge um objetivo no
sistema. Cada um tem um **caminho principal** (o "caminho feliz", quando tudo dá
certo) e **fluxos alternativos** (o que acontece quando algo sai do esperado).

> Convenção: UC-XX. Os passos referenciam os requisitos (RF-XX) do documento
> [`01-requisitos.md`](./01-requisitos.md).

---

## UC-01 — Visitante navega pelo catálogo

- **Ator:** Visitante
- **Objetivo:** Encontrar produtos de interesse
- **Pré-condições:** Nenhuma (não precisa estar logado)

**Caminho principal:**
1. Visitante acessa a página inicial.
2. Sistema exibe categorias e produtos em destaque (RF-01, RF-02).
3. Visitante busca por nome ou filtra por categoria/preço (RF-03, RF-04).
4. Sistema exibe a lista filtrada.
5. Visitante abre um produto e vê os detalhes (RF-05).

**Fluxos alternativos:**
- **3a.** Busca sem resultados → Sistema exibe "Nenhum produto encontrado" e sugere categorias.

---

## UC-02 — Cliente se cadastra (com verificação de maioridade)

- **Ator:** Visitante
- **Objetivo:** Criar uma conta para poder comprar
- **Pré-condições:** Não possuir conta com o mesmo e-mail

**Caminho principal:**
1. Visitante acessa "Cadastrar".
2. Informa nome, e-mail, senha e **data de nascimento** (RF-09).
3. Sistema valida que o cliente tem **18 anos ou mais** (RF-10, RNF-03).
4. Sistema valida que o e-mail ainda não está cadastrado.
5. Sistema cria a conta com a senha **em hash** (RNF-01).
6. Cliente é autenticado e redirecionado.

**Fluxos alternativos:**
- **3a.** Menor de 18 anos → Sistema **bloqueia** o cadastro e exibe aviso de venda proibida para menores (RNF-09).
- **4a.** E-mail já cadastrado → Sistema informa e sugere fazer login.

---

## UC-03 — Cliente faz login

- **Ator:** Cliente
- **Objetivo:** Acessar sua conta
- **Pré-condições:** Possuir conta cadastrada

**Caminho principal:**
1. Cliente informa e-mail e senha (RF-11).
2. Sistema valida as credenciais.
3. Sistema autentica e libera as áreas de cliente.

**Fluxos alternativos:**
- **2a.** Credenciais inválidas → Sistema exibe erro genérico ("e-mail ou senha incorretos") — *não* revela qual dos dois errou (boa prática de segurança).

---

## UC-04 — Cliente realiza uma compra ⭐ (caso de uso central)

- **Ator:** Cliente
- **Objetivo:** Comprar produtos e gerar um pedido
- **Pré-condições:** Estar logado e ter itens no carrinho

**Caminho principal:**
1. Cliente adiciona produtos ao carrinho (RF-06).
2. Sistema atualiza o subtotal (RF-07) e valida o estoque (RF-08).
3. Cliente avança para o checkout.
4. Cliente escolhe **entrega** ou **retirada** (RF-14).
   - Se entrega: escolhe/cadastra um endereço (RF-15).
5. Cliente escolhe a forma de pagamento: **PIX online** ou **na entrega** (RF-16).
6. Sistema cria o pedido com status inicial (RF-17).
7. Se PIX online: sistema gera o código PIX e aguarda a confirmação do pagamento.
8. Pagamento confirmado → sistema reduz o estoque (RF-18) e marca o pedido como "pago".
9. Sistema exibe a confirmação e o pedido aparece no histórico (RF-13).

**Fluxos alternativos:**
- **2a.** Estoque insuficiente → Sistema avisa e ajusta a quantidade máxima disponível.
- **5a.** Pagamento na entrega → pedido vai direto para "aguardando separação" (sem etapa de pagamento online).
- **7a.** PIX expira sem pagamento → pedido é cancelado e o estoque permanece intacto.
- **8a.** Pagamento recusado/falha → pedido fica "aguardando pagamento"; cliente pode tentar de novo.

**Pós-condições:** Pedido registrado; estoque atualizado (se pago); cliente notificado.

---

## UC-05 — Administrador cadastra/edita produto

- **Ator:** Administrador
- **Objetivo:** Manter o catálogo atualizado
- **Pré-condições:** Estar logado como administrador (RNF-04)

**Caminho principal:**
1. Admin acessa o painel e abre "Produtos".
2. Cadastra ou edita um produto com nome, preço, categoria, imagem e estoque (RF-19, RF-20).
3. Sistema salva e o produto passa a aparecer no catálogo.

**Fluxos alternativos:**
- **2a.** Admin **desativa** um produto → ele some do catálogo, mas o histórico de pedidos antigos é preservado.

---

## UC-06 — Administrador gerencia pedidos

- **Ator:** Administrador
- **Objetivo:** Acompanhar e atualizar o andamento dos pedidos
- **Pré-condições:** Estar logado como administrador

**Caminho principal:**
1. Admin acessa "Pedidos".
2. Sistema lista os pedidos com seus status (RF-21).
3. Admin atualiza o status (ex: de "pago" para "em separação", depois "a caminho", "entregue").
4. Sistema registra a mudança.
