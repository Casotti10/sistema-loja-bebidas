# Arquitetura — Bebida Loja

> **Fase 2 — Arquitetura**
> Última atualização: 2026-06-22

Este documento registra as decisões de arquitetura do projeto e o **porquê** de cada uma.

---

## 1. Estilo arquitetural

**Monólito** (uma aplicação única, um deploy só), organizado internamente em camadas.

- **Por quê:** projeto solo, MVP, time pequeno. Microserviços trariam complexidade
  (rede, orquestração) sem benefício nesta fase. Monólito bem organizado escala
  bem até o ponto em que (e se) valer a pena extrair serviços.

---

## 2. Stack escolhida

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Front-end + Back-end | **Next.js (React) + TypeScript** | Uma linguagem só (TS) no projeto inteiro; SSR para SEO (vital em e-commerce); ecossistema maduro |
| Banco de dados | **PostgreSQL** | Dados de e-commerce são relacionais (produto ↔ pedido ↔ cliente ↔ item); integridade transacional |
| Acesso a dados (ORM) | **Prisma** | Type-safe a partir do TypeScript; migrações versionadas; menos SQL repetitivo e mais seguro |
| Hospedagem | **VPS Hostinger + Docker** | Aprendizado de infra real; controle total; previsto na Fase 7 |

> SQL vs NoSQL: escolhemos relacional porque a consistência entre pedido, itens e
> estoque exige transações e integridade referencial — o ponto forte do SQL.

---

## 3. Arquitetura em camadas (dentro do monólito)

Cada camada tem **uma única responsabilidade** (SRP/SOLID) e só conversa com a
camada imediatamente abaixo.

```
🎨 Apresentação  →  ⚙️ Negócio/Serviços  →  🗄️ Dados/Repositórios  →  PostgreSQL
```

| Camada | Responsabilidade | O que NÃO faz |
|--------|------------------|---------------|
| **Apresentação** | Renderizar a UI, capturar entradas do usuário | Não contém regra de negócio nem SQL |
| **Negócio (Serviços)** | Regras: "tem estoque?", "é maior de 18?", "calcular total" | Não sabe como o dado é renderizado nem como é salvo |
| **Dados (Repositórios)** | Ler/gravar no banco (via Prisma) | Não contém regra de negócio |

**Benefício:** trocar o banco, mudar uma regra ou redesenhar a tela afeta apenas
uma camada. Baixo acoplamento, alta coesão.

---

## 4. Estrutura de pastas

> O projeto foi criado com `create-next-app` (Next 16) usando o layout padrão:
> `app/` fica na **raiz** (sem pasta `src/`). As pastas `components/`, `lib/` e
> `server/` serão criadas conforme o desenvolvimento (Fase 4). O alias de import
> `@/*` aponta para a raiz do projeto.

```
bebida-loja/
├── app/                       # CAMADA DE APRESENTAÇÃO (Next.js App Router) — já existe
│   ├── (loja)/                # páginas públicas (catálogo, produto, carrinho)   [Fase 4]
│   ├── (conta)/               # páginas do cliente (login, pedidos)              [Fase 4]
│   ├── admin/                 # painel administrativo                            [Fase 4]
│   ├── api/                   # CAMADA DE ENTRADA DO BACK-END (rotas HTTP)        [Fase 4]
│   ├── layout.tsx             # layout raiz (já existe)
│   ├── page.tsx               # página inicial (já existe)
│   └── globals.css            # estilos globais (já existe)
├── components/                # componentes React reutilizáveis (UI "burra")     [Fase 4]
├── features/                  # código agrupado por domínio (produtos, carrinho) [Fase 4]
├── server/                                                                       # [Fase 4/5]
│   ├── services/              # CAMADA DE NEGÓCIO (regras de negócio)
│   └── repositories/          # CAMADA DE DADOS (acesso via Prisma)
├── lib/                       # utilitários e o cliente Prisma compartilhado     [Fase 4]
├── prisma/
│   └── schema.prisma          # modelo do banco                                  [Fase 5]
├── public/                    # imagens estáticas, ícones (já existe)
├── docs/                      # documentação (já existe)
├── .env                       # segredos (NÃO vai para o Git)                    [Fase 4]
├── .gitignore                 # criado pelo Next (já existe)
├── .gitattributes             # já existe
├── package.json               # já existe
└── next.config.ts             # já existe
```

### Responsabilidade de cada pasta

- **`app/`** — Páginas e rotas. No Next.js, a estrutura de pastas vira as URLs.
  As subpastas entre parênteses `(loja)` são "grupos de rotas": organizam sem
  aparecer na URL.
- **`app/api/`** — O back-end. Cada arquivo aqui é um endpoint HTTP que recebe a
  requisição e **chama um serviço** (não contém a regra direto).
- **`components/`** — Peças visuais reutilizáveis (botão, card de produto). Sem
  regra de negócio.
- **`features/`** — Agrupa por domínio o que pertence a um mesmo assunto. Facilita
  achar tudo de "carrinho" num lugar só.
- **`server/services/`** — O cérebro. Onde moram as regras (estoque, maioridade,
  cálculo de total).
- **`server/repositories/`** — Conversa com o banco via Prisma. Isola o acesso a dados.
- **`lib/`** — Funções utilitárias e o cliente único do Prisma.
- **`prisma/`** — O esquema do banco e as migrações (detalhado na Fase 5).

---

## 5. Decisões em aberto (para fases futuras)

- Autenticação: biblioteca a definir (provável NextAuth/Auth.js) — Fase 4.
- Gateway de pagamento PIX: a definir (Mercado Pago, etc.) — Fase 6.
- Estratégia de deploy e CI/CD — Fase 7.
