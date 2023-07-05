// Importer les modules nécessaires
const http = require('http');

// Créer un serveur HTTP
const server = http.createServer((req, res) => {
    // Définir l'en-tête de la réponse
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Envoyer la réponse
    res.end('<h1>Bienvenue sur notre catalogue</h1>');
});

// Écouter sur le port 3000
server.listen(3000, () => {
    console.log('Le serveur est en cours d\'exécution sur le port 3000...');
});