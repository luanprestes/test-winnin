# Test Winin

Sistema de pedidos fictício desenvolvido em TypeScript com GraphQL, seguindo os princípios da Clean Architecture.
Implementa criação de pedidos com controle de estoque transacional e proteção contra race conditions.

## 📦 O Desafio

Esta aplicação foi construída para atender ao seguinte escopo:

- [x] Cadastrar usuários
- [x] Listar usuários e seus pedidos
- [x] Cadastrar produtos
- [x] Listar produtos
- [x] Emitir ordens de compra de produtos
- [x] Garantir integridade do estoque em pedidos concorrentes
- [x] Expor API via GraphQL
- [x] Dockerfile + Docker Compose para execução local
- [x] (Opcional) GitHub Actions com CI/CD

## 🧱 Arquitetura

O projeto é dividido em camadas conforme os princípios da Clean Architecture:

- `application`: Casos de uso (Use Cases), DTOs e regras de negócio.
- `domain`: Entidades e contratos (repositórios, transações).
- `infra`: Implementações concretas como Prisma.
- `presentation`: Entrypoint GraphQL e validadores.
- `main`: Bootstrap e inicialização da aplicação.
- `tests`: Testes de integração e concorrência.

## 🚀 Como rodar

### Pré-requisitos

- Node.js >= 18
- Yarn
- Docker e Docker Compose

### Subindo o ambiente

```bash
# Clone o repositório
git clone <repo-url>
cd test-winnin

# Instale as dependências
yarn

# Suba os containers (Postgres + Backend)
docker-compose up -d
```

O servidor GraphQL estará disponível na porta **4000** logo após a primeira subida.

> O `.env` é gerado automaticamente com `DATABASE_URL` apontando para o container Postgres.

### Testes

```bash
# Executa todos os testes
yarn test
```

## 🔍 Funcionalidades

- Criação de pedidos com múltiplos produtos.
- Validação de estoque disponível.
- Atualização de estoque em ambiente concorrente (transações seguras).
- Interface via GraphQL.
- Cobertura de testes para erros de negócio e concorrência.

## 🧪 Estrutura de Testes

- `tests/integration/race-condition.spec.ts`: Simula concorrência e garante proteção contra race conditions.
- Casos de uso e repositórios testados com mocks e banco real.

## 🛠 Tecnologias

- TypeScript
- Prisma ORM
- GraphQL
- PostgreSQL
- Docker
- Jest

## 📁 Estrutura resumida

```
src/
├── application/         # Casos de uso e regras de negócio
├── domain/              # Entidades e contratos
├── infra/prisma/        # Implementações com Prisma
├── main/                # Bootstrap do app
├── presentation/        # GraphQL e validações
├── tests/               # Testes de integração
```

## 📄 Documentação Técnica

### Transações seguras com proteção contra concorrência

A lógica de criação de pedidos foi encapsulada em uma transação atômica usando `Prisma.$transaction` com `updateMany + where stock >=`, garantindo que múltiplos pedidos simultâneos disputando o mesmo estoque não corrompam o sistema.

### Clean Architecture

Todo o core de domínio e regras de negócio está desacoplado da infraestrutura (Prisma), permitindo fácil adaptação ou substituição futura.
