const db = require('../models/index');
const fs = require('fs');
const Post   = db.post;
const User   = db.user;


// Création d'un post
exports.createPost = (req, res) => {
    let image = '';
    if (req.file) { 
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    };

    if(req.body.contenu == null) {
        return res.status(400).send({ message: 'Votre message est vide' });
    };

    const post = new Post(
        {
            UserId: req.body.UserId,
            contenu: req.body.contenu,
            image: image
        })
    post.save()
        .then(() => res.status(201).json({ message: 'Publication réussie' }))
        .catch((error) => { res.status(400).json({ message: 'erreur 400 - ' + error })})
};


// Afficher tous les posts
exports.allPosts = (req, res) => {
    Post.findAll({
        attributes: ['contenu', 'image'],
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['nom', 'prenom', 'photo']
        }]
    })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Afficher un post
exports.userPosts = (req, res) => {
    Post.findOne({ 
        where: { id: req.params.id },
        attributes: ['contenu', 'image'],
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['nom', 'prenom', 'photo']
        }]
    })  
    .then((post) => res.status(200).json({post}))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Modification des posts
exports.modifyPost = (req, res) => {
    const id = req.params.id;

    const messageObject = req.file ?
    {
        contenu: req.body.contenu,
        image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ... req.body};

    if(messageObject.contenu === undefined || messageObject.contenu === null) {
        return res.status(400).json({ message: 'Votre message est vide' });
    }

    Post.update({
        ...messageObject, id: id},
        { where: { id: id }
    })
    .then(() => res.status(200).json({ message: 'Post modifié' }))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Suppression d'un post
exports.deletePost = (req, res) => {
    const id = req.params.id;

    Post.findOne({
        where: { id: id },
        attributes: ['image']
    })
      .then(post => {
        const filename = post.image.split('/images/')[1];       
        fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where: { id: id }})
            .then(() => res.status(201).json({ message: 'Post supprimé !' }))
            .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
        });
      })
      .catch((error) => { res.status(500).json({ message: " erreur 500 - " + error })});
};

// Suppression d'un post par l'administrateur - à tester en front-end
exports.adminDeletePost = (req, res) => {
    const id = req.params.id;

    User.findAll()
    .then(user => {
      if (user.isAdmin) {
        Post.destroy ({ where: { id: id }})
            .then(() => res.status(201).json({ message: 'Post supprimé par l\'administrateur !' }))
            .catch((error) => { res.status(400).json({ message: " erreur 400 " + error })});
      } else {
        res.status(401).json({message : " Non autorisé " });
      }
    })
    .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
  };