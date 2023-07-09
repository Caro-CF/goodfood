# Utilisez une image de base contenant Node.js
FROM node:18

# Créez un répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances du projet
RUN npm install

# Copiez tous les fichiers source dans le répertoire de travail
COPY . .

# Exposez le port sur lequel le serveur écoute
EXPOSE 3000

# Démarrez l'application lorsque le conteneur démarre
CMD [ "node", "server.js" ]
