# Utiliser une image de base avec Node.js pré-installé
FROM node:16-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'API dans le conteneur
COPY . .

# Restore dependencies
RUN npm install amqplib

# Démarrer l'API
CMD ["node", "receiver.js"]
