# Etapa 1: Imagem Base
FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

# Etapa 2: Instalação das Dependências
FROM base AS dependencies
RUN npm install --production

# Etapa 3: Cópia do Código da Aplicação
FROM dependencies AS build
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Etapa 4: Imagem Final de Produção
FROM base AS production
COPY --from=build /usr/src/app .

EXPOSE 8080

USER node

# O comando final para iniciar a aplicação quando o contêiner for executado.
CMD [ "node", "index.js" ]