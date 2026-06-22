# Fluxos do Sistema — Bebida Loja

> **Fase 1 — Planejamento**
> Última atualização: 2026-06-22

Diagramas dos principais caminhos do sistema. Escritos em **Mermaid** (renderiza
no GitHub e no VS Code com a extensão de Markdown Preview Mermaid).

Os fluxos abaixo são a versão visual dos casos de uso em
[`02-casos-de-uso.md`](./02-casos-de-uso.md).

---

## 1. Fluxo de Cadastro com Verificação de Maioridade (UC-02)

```mermaid
flowchart TD
    A[Visitante preenche o cadastro] --> B{Tem 18 anos ou mais?}
    B -- Não --> C[Bloqueia cadastro\nExibe aviso de venda proibida a menores]
    B -- Sim --> D{E-mail já cadastrado?}
    D -- Sim --> E[Informa e sugere login]
    D -- Não --> F[Cria conta\nSenha em hash]
    F --> G[Autentica e redireciona]
```

---

## 2. Fluxo de Compra (UC-04) — caminho central do sistema

```mermaid
flowchart TD
    A[Cliente monta o carrinho] --> B{Estoque suficiente?}
    B -- Não --> C[Ajusta quantidade disponível]
    C --> A
    B -- Sim --> D[Checkout]
    D --> E{Entrega ou retirada?}
    E -- Entrega --> F[Escolhe endereço]
    E -- Retirada --> G[Segue sem endereço]
    F --> H{Forma de pagamento?}
    G --> H
    H -- PIX online --> I[Gera código PIX]
    H -- Na entrega --> J[Pedido: aguardando separação]
    I --> K{PIX pago no prazo?}
    K -- Não --> L[Cancela pedido\nEstoque preservado]
    K -- Sim --> M[Reduz estoque\nPedido: pago]
    J --> N[Confirma pedido]
    M --> N
    N --> O[Mostra confirmação\nPedido no histórico]
```

---

## 3. Ciclo de Vida (Status) do Pedido

Um pedido passa por estados bem definidos. Modelar isso agora evita confusão
quando formos criar o banco de dados (Fase 5) e o painel admin.

```mermaid
stateDiagram-v2
    [*] --> AguardandoPagamento: pedido PIX criado
    [*] --> AguardandoSeparacao: pagamento na entrega

    AguardandoPagamento --> Pago: PIX confirmado
    AguardandoPagamento --> Cancelado: PIX expirou / falhou

    Pago --> AguardandoSeparacao: liberado para a loja
    AguardandoSeparacao --> EmSeparacao: loja separa os itens
    EmSeparacao --> ACaminho: saiu para entrega
    EmSeparacao --> ProntoRetirada: disponível para retirada

    ACaminho --> Entregue
    ProntoRetirada --> Entregue: cliente retirou

    Entregue --> [*]
    Cancelado --> [*]
```

> **Observação de arquitetura:** repare que o pagamento na entrega "pula" a etapa
> de pagamento online. Mapear esses dois caminhos agora vai facilitar muito a
> modelagem da tabela de pedidos na Fase 5.
