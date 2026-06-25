# 🍷 Bebida Loja — Loja Virtual de Bebidas

Plataforma web de e-commerce para uma loja de bebidas, responsiva (desktop, tablet e celular).

> **Status:** 🟢 Fase 4 — Desenvolvimento

## Visão Geral

Sistema de loja virtual com catálogo de produtos, carrinho, checkout com pagamento
(PIX no MVP), área do cliente e painel administrativo. Por vender bebida alcoólica,
o sistema inclui verificação de maioridade.

## Documentação

A documentação técnica do projeto fica na pasta [`docs/`](./docs):

| Documento                                              | Descrição                                   |
| ------------------------------------------------------ | ------------------------------------------- |
| [`docs/01-requisitos.md`](./docs/01-requisitos.md)     | Requisitos funcionais e não-funcionais      |
| [`docs/02-casos-de-uso.md`](./docs/02-casos-de-uso.md) | Casos de uso (passo a passo das interações) |
| [`docs/03-fluxos.md`](./docs/03-fluxos.md)             | Fluxos visuais (diagramas Mermaid)          |
| [`docs/04-arquitetura.md`](./docs/04-arquitetura.md)   | Decisões de arquitetura e stack             |

## Roadmap (Fases)

- [x] **Fase 1** — Planejamento
- [x] **Fase 2** — Arquitetura
- [x] **Fase 3** — Ambiente de desenvolvimento _(em andamento)_
- [ ] **Fase 4** — Desenvolvimento (módulo por módulo)
- [ ] **Fase 5** — Banco de dados
- [ ] **Fase 6** — Integrações (pagamentos, notificações)
- [ ] **Fase 7** — Deploy e produção

## Tecnologias

Definidas na **Fase 2 — Arquitetura** (detalhes em [`docs/04-arquitetura.md`](./docs/04-arquitetura.md)):

- **Front-end + Back-end:** Next.js (React) + TypeScript
- **Banco de dados:** PostgreSQL
- **ORM / acesso a dados:** Prisma
- **Infraestrutura:** Docker + VPS Hostinger
