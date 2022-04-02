# Groupomania
## Réseaux social d'entreprise
Dans votre nouveau dossier Groupomania
`git init`
`git clone https://github.com/LaurelineGuernion/LaurelineGuernion_7_23032022.git`

### Backend
Technologies utilisées :
- Express
- Node JS
- Mysql
- Sequelize

#### Dans le dossier groupomania/backend
Installer express 
`npm install`

Puis connexion au serveur
`nodemon`

### Frontend
Technologies utilisées :
- Vue 3 JS
- Bootstrap
- Axios
- Sass

#### Dans le dossier groupomania/frontend
Installer express 
`npm install`

Puis connexion au serveur 
`npm run serve`

### Notes importantes pour l'installation
* Installer au préalable MYSQL

* Importer le fichier groupomania_developpement.sql du lien Github dans votre nouvelle base de données manuellement.
* Manipulation dans le terminal :
    Avant tout, créer dans MYSQL la base de données : `CREATE DATABASE nombasededonnees ;`
    Faire `Exit` pour sortir de MYSQL.
    Dans le terminal : `mysql - u utilisateur -p nombasededonnees < groupomania_developpement.sql ;`

* Remplir les champs du fichier .env.initial pour personnaliser vos accès.
* Renommer ce même fichier en .env

* Il est probable d'adapter Node Js pour que l'application fonctionne, suivre les liens suivants :
- Installation avec Brew, dans le terminal :
`brew install node`

- Puis suivre les instructions dans le terminal :
```
node --version
brew search node
brew unlink node
brew install node@14
brew link node@14
node --version
```

### Serveurs
* Accès serveur backend `http://localhost:3000/`
* Accès serveur frontend `http://localhost:8080/`