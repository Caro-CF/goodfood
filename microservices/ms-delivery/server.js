const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Utilisation des routes
app.use('/', routes);

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
// Démarrer le serveur
const connectionString = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

app.listen(PORT, function(){
    console.log(`Listening on ${PORT}`);
    mongoose.connect(connectionString)
    .then(() => {
        console.log("MongoDB connected");
    });
});