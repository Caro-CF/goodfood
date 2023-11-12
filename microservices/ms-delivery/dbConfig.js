const config = {
  host: 'localhost',
  port: 27017,
  database: 'delivery',
  user: 'CGA', // Remplacez par votre nom d'utilisateur MongoDB
  password: 'MAALSICESI2024', // Remplacez par votre mot de passe MongoDB
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Autres options de configuration de MongoDB
  }
};

export default config;
