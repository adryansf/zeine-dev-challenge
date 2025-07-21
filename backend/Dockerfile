# Imagem base oficial do Node.js
FROM node:22-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run start

# Expõe a porta padrão do backend
EXPOSE 3000

# Comando para iniciar o backend
CMD ["npm", "start"]
