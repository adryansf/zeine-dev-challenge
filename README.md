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
- Prisma ORM
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
