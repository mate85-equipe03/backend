######################################## 
#   Container para desenvolvimento local
######################################## 

# Pega imagem mais recente do node
FROM node:18-alpine AS development

# define diretorio de trabalho como /usr/src/app
WORKDIR /usr/src/app

# copia o package json e o package-lock para o container
COPY package*.json ./

# faz a instalação das dependencias
RUN npm i

# copia todos os arquivos da aplicação para o container
COPY . .

######################################## 
#   Container para build
######################################## 

# Pega imagem mais recente do node
FROM node:18-alpine AS build

# define diretorio de trabalho como /usr/src/app
WORKDIR /usr/src/app

# copia o package json e o package-lock para o container
COPY package*.json ./

# copia o node_modules criado pelo container de desenvolvimento
COPY --from=development /usr/src/app/node_modules ./node_modules

# copia todos os arquivos da aplicação para o container
COPY . .

# roda lint testes e então faz o build da aplicação
RUN npm run lint && npm run test && npm run test:e2e && npm run build

# apaga antiga node_modules e instala apenas dependencias de produção
RUN npm ci --only=production && npm cache clean --force

##################################################
#   Container para rodar aplicação em produção
##################################################

# Pega imagem mais recente do node
FROM node:18-alpine AS production

# Copia pastas do node_modules e dist da aplicação geradas no estagio de build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# quando o container subir inicia a aplicação 
CMD ["node", "dist/main"]

