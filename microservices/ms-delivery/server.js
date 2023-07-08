import express, { json } from 'express';
import pkg from 'mssql';
const { connect } = pkg;
import routes from './routes.js';
import config from './dbConfig.js';

const app = express();

app.use(json());

// Utilisation des routes
app.use('/', routes);

// Démarrer le serveur
connect(config).then(() => {
  app.listen(3000, () => {
    console.log('Le serveur est en cours d\'exécution sur le port 3000.');
  });
}).catch(err => {
  console.error('Erreur lors de la connexion à la base de données:', err);
});