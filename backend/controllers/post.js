const db = require('../models');
const fs = require('fs');
const Post   = db.Post;
const User   = db.User;


// Création d'un post
exports.createPost = (req, res) => {
    let image = '';
    if (req.file) { 
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
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
        attributes: ['contenu', 'image', 'userId', 'id', 'createdAt'],
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['nom', 'prenom', 'photo', 'id']
        }]
    })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Afficher un post
exports.userPosts = (req, res) => {
    Post.findOne({ 
        where: { id: req.params.id },
        attributes: ['contenu', 'image', 'userId', 'createdAt'],
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['nom', 'prenom', 'photo', 'id']
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