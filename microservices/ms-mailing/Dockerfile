# Utilisez l'image officielle Node.js en tant qu'image parente.
FROM node:14-alpine

# Définissez le répertoire de travail dans le conteneur.
WORKDIR /usr/src/app

# Copiez les fichiers de dépendances package.json et package-lock.json.
COPY package*.json ./

# Installez les dépendances de l'application.
# Utilisez npm ci au lieu de npm install pour les installations de production.
RUN npm install

# Copiez les fichiers sources de l'application dans le conteneur.
COPY . .

# Exposez le port que votre application écoute.
EXPOSE 3001

# Définissez la variable d'environnement pour Node.js en mode production.
ENV NODE_ENV production

# Lancez l'application.
CMD ["node", "server.js"]
