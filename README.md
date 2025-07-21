# 🚀 Zeine Dev Challenge

Sistema web para gestão de produtos em um marketplace, simulando o painel de controle de um vendedor.

[🎨 Protótipo Figma](https://www.figma.com/community/file/1405890943950015706)

---

## 🎯 Objetivo

Implementar três telas principais com funcionalidades completas de autenticação e gerenciamento de produtos:

- Login
- Listagem de Produtos
- Cadastro de Produto

---

## 🖼️ Funcionalidades

### ✅ Tela de Login

- Autenticação com e-mail e senha
- Validação de campos obrigatórios

### ✅ Tela de Listagem de Produtos

- Exibe produtos cadastrados com imagem, descrição, preço e status
- Filtros por texto e status (ativo, inativo, vendido etc.)

### ✅ Tela de Cadastro de Produto

- Upload de imagem do produto
- Campos: título, descrição, valor e categoria
- Ações: salvar, publicar ou cancelar

> 💬 **Mensagem secreta:**  
> Ao manter o mouse sobre o botão “Novo produto” por 7 segundos, surge a tooltip:  
> **“Tá esperando o quê? Boraa moeer!! 🚀”**

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- Fastify (TypeScript)
- PostgreSQL
- DrizzleORM
- Swagger na rota `/docs`

### Outros

- Docker + Docker Compose
- MinIO para upload de imagens

---

## ⚙️ Como rodar localmente com Docker

> Certifique-se de ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados.

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/zeine-dev-challenge.git
cd zeine-dev-challenge
```

### 2. Crie o .env dentro da pasta /docker

```bash
cp docker/.env.example docker/.env
```

### 3. Suba os containers

```bash
docker-compose -f docker/docker-compose.yml up --build
```

# 🌐 Acesso aos Serviços

| Serviço  | URL                        |
| -------- | -------------------------- |
| Frontend | http://localhost:3001      |
| Backend  | http://localhost:3000/docs |
| MinIO    | http://localhost:9001      |

---

## 📦 Estrutura do Projeto

.
├── backend/ # Backend com Fastify e DrizzleORM
│ ├── src/
│ ├── drizzle/
│ └── ...
├── frontend/ # Frontend com Next.js
│ ├── app/
│ ├── components/
│ └── ...
├── docker/ # Infraestrutura com Docker
│ ├── docker-compose.yml
│ └── .env
├── README.md
└── ...

---

## 📌 Próximos passos

- [ ] ✅ Adicionar testes automatizados (API e/ou UI)
- [ ] ✅ Gerar e incluir o diagrama ERD
- [ ] ✅ Publicar deploy do frontend (ex: Vercel)
- [ ] ✅ Publicar deploy do backend (ex: Render, Railway etc.)

---

## 🧪 Testes

> Em breve...

---

## 🧠 Decisões Técnicas

- **Separação de responsabilidades:** organização clara entre frontend, backend e infraestrutura (`/docker`)
- **MinIO** para simular armazenamento de imagens, evitando dependência da AWS S3 em ambiente local
- **Fastify + DrizzleORM** para performance e simplicidade na camada backend
- **Swagger** no backend para facilitar testes e documentação rápida da API
- **Tailwind CSS** para estilização rápida e responsiva no frontend

---

## 📊 Diagrama ERD

> Em breve...

---

## 🌍 Deploy

> Em breve...

---

## 🛡️ Autenticação

- Utiliza JWT / Cookies (via [Better Auth](https://github.com/better-typed/better-auth))

---

## 🧩 Extras implementados

- Validações com `zod` tanto no frontend quanto backend
- Upload de imagem com visualização em tempo real
- Mensagem secreta interativa (hover de 7 segundos)
- Componentes reutilizáveis e tipados com TypeScript
