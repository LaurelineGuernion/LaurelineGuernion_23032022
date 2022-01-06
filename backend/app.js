const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({path: './config/.env'});
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const { Sequelize } = require('sequelize');

const app = express();

app.use(express.json ({limite: '10kb'}));
app.use(cors());
app.use(helmet());
app.use(xss());

//////////////////// TESTER LA CONNEXION SEQUELIZE AVEC LA BDD ////////////////////
const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: "localhost"
});

try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
};

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//////////////////// RÉCUPÉRATION DES INFORMATIONS DU BODY ////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////////// POINTER VERS LE RÉPERTOIRE IMAGES ////////////////////
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;