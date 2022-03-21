const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PASSWORD = /^(?=.*\d).{4,15}$/;

// Inscription
exports.signup = (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;
    const cryptedEmail = cryptoJs.HmacSHA256(email, process.env.EMAIL_KEY_CRYPTO).toString();

    if (nom == null || prenom == null || email == null || password == null) {
        return res.status(400).json({ message: 'Un champs est vide' })
    };

    if (!REGEX_EMAIL.test(email)) {
      return res.status(400).json({ 'erreur':'Email invalide' })
    };

    if(!REGEX_PASSWORD.test(password)){
      return res.status(400).json({ 'erreur':'Mot de passe invalide' })
    };

    User.findAll()
    .then(users => {
      // Création administrateur
      if(users.length === 0) {
        bcrypt.hash(password, 10)
        .then(hash => {
          const user = new User({
              id: 1,
              nom: nom,
              email: cryptedEmail,
              prenom: prenom,
              password: hash,
              isAdmin: 1
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Création de l\'admin', userId: user.id }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
      } else {
      // Création user
      User.findOne({ where: {email: cryptedEmail }})
      .then(userFound => {
        if (!userFound) {
          bcrypt.hash(password, 10)
          .then(hash => {
            const user = new User({
                nom: nom,
                prenom: prenom,
                email: cryptedEmail,
                password: hash,
                isAdmin: 0
            });
            user.save()
              .then(() => res.status(201).json({ message: 'Utilisateur créé !', userId: user.id }))
              .catch(error => res.status(400).json({ error }));
          })
          .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
  
        } else {
          return res.status(409).json({ error: 'Email déja utilisé !' });
        };
      })
      .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
    }
  })
};

// Connexion
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const cryptedEmail = cryptoJs.HmacSHA256(email, process.env.EMAIL_KEY_CRYPTO).toString();

  if (!REGEX_EMAIL.test(email)) {
    return res.status(400).json({ 'erreur':'Email invalide ' });
  };

  if(!REGEX_PASSWORD.test(password)){
    return res.status(400).json({ 'erreur':'Mot de passe invalide' });
  };

  if (!email || !password) {
    return res.status(400).json({ error: 'Un ou des champs sont manquants' });
  };

  User.findOne({ where: {email: cryptedEmail }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Email non valide !' });
      };

      bcrypt.compare(password, user.password)
        .then(valid => { 
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          };

          res.status(200).json({
            message: 'Connexion réussie',
            userId: user.id,
            isAdmin: user.isAdmin,
            prenom: user.prenom,
            nom: user.nom,
            email:user,email,
            token: jwt.sign(
              { userId: user.id },
              process.env.TOKEN_SECRET,
              { expiresIn: '24h' }
            )
          });
        })
        .catch((error) => { res.status(500).json({ message: ' erreur serveur | ' + error })})
    })
    .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
};

// Trouver un utilisateur
exports.findUser = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
  
  .then((user) => res.status(200).json({
    message: ' Utilisateur trouvé ',
    userId: user.id,
    nom: user.nom,
    prenom: user.prenom,
    photo: user.photo,
    bio: user.bio,
    password: user.password,
    email: user.email,
    isAdmin: user.isAdmin
  }))
  .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Trouver tous les utilisateurs
exports.findAllUsers = (req, res) => {
  User.findAll()
  .then((users) => res.status(200).json(users))
  .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

  // Mise à jour du compte utilisateur
exports.updateInfo = (req, res) => {
  const id = req.params.id;

  User.findOne({ where: {id: id }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Id non valide !' });
      }})
    .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})

  User.update(
    { nom : req.body.nom,
      prenom : req.body.prenom,
      bio: req.body.bio
    },
    { where: { id: id }}
  )
  .then(() => res.status(201).json({ message: 'Utilisateur modifié !', userId: id }))
  .catch((error) => { res.status(500).json({ message: " erreur 500 - " + error })})
  };

  // Enregistrer une image profil
exports.savePhoto = (req, res) => {
  const id = req.params.id;

  if (!req.file) {
    return res.send('Télécharger l\'image')
  };
  
  User.findOne({ where: { id: id }})
  
  .then(idFound => {
    if (!idFound) {
      return res.status(401).json({ error: 'Id non valide !' });
    } else {
      User.update(
        { photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`},
        { where: { id: id }}
      )
      .then(() => res.status(201).json({ message: 'Photo mise à jour !'}))
      .catch(error => res.status(400).json({ error }));
    }
  })
  .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
};

// Mise à jour de l'email
exports.updateEmail = (req, res) => {
  const id = req.params.id;
  const email = req.body.email;
  const cryptedEmail = cryptoJs.HmacSHA256(email, process.env.EMAIL_KEY_CRYPTO).toString();

  User.findOne({ where: {id: id }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Id non valide !' });
      }})
    .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})

  User.update(
    { email: cryptedEmail
    },
    { where: { id: id }}
  )
  .then(() => res.status(201).json({ message: 'Utilisateur modifié !', userId: id }))
  .catch((error) => { res.status(500).json({ message: " erreur 500 - " + error })})
  };

// Mise à jour du mot de passe utilisateur
exports.updatePassword =  (req, res) => {
  const id = req.params.id;
  const password = req.body.password;
  const hash =  bcrypt.hashSync(password, 10);

  if(!REGEX_PASSWORD.test(password)){
    return res.status(400).json({ 'erreur':'Mot de passe invalide' })
  };

  User.findOne({ where: { id: id }})
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Id non valide !' });
    }})
  .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
    
  User.update(
    { password: hash},
    { where: { id: id }}
  )
  .then(() => res.status(201).json({ message: 'Mot de passe modifié !', userId: id }))
  .catch((error) => { res.status(500).json({ message: ' erreur 500 - ' + error })})
};

// Supprimer un compte utilisateur
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findOne({
    where: {id: id },
    attributes: ['photo']
  })
  .then(user => {
    if (!user) {
      return res.status(409).json({ error: 'Id non valide !' });
    } else if(user.photo) {
      const filename = user.photo.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
      User.destroy ({ where: { id: id }})
          .then(() => res.status(201).json({ message: 'Utilisateur supprimé !' }))
          .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
      });
    } else {
      User.destroy ({ where: { id: id }})
          .then(() => res.status(201).json({ message: 'Utilisateur supprimé !' }))
          .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
    }
  })
  .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
};