const db = require('../models');
const fs = require('fs');
const Post   = db.Post;
const User   = db.User;
const checkIdToken = require('../middelware/check-id-token');
const checkAdmin = require('../middelware/check-admin');

const REGEX_IMAGE = /[^0-9a-zA-Z\._-]/;

// Création d'un post
exports.createPost = (req, res) => {
    const id = req.params.id;
    const checkId = checkIdToken(req);
    const sanitizedContenu = req.sanitize(req.body.contenu);
    let image = '';

    if (req.file) { 
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    };

    if(req.file === undefined) {
        const post = new Post(
            {
                UserId: checkId,
                contenu: sanitizedContenu,
                image: image
            })
        post.save()
            .then(() => res.status(201).json({ message: 'Publication réussie' }))
            .catch((error) => { res.status(400).json({ message: 'erreur 400 - ' + error })})
    } else {
        if (!REGEX_IMAGE.test(req.file.filename)){
            const post = new Post(
                {
                    UserId: checkId,
                    contenu: sanitizedContenu,
                    image: image
                })
            post.save()
                .then(() => res.status(201).json({ message: 'Publication réussie' }))
                .catch((error) => { res.status(400).json({ message: 'erreur 400 - ' + error })})
        }
    };
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

// Modification des posts
exports.modifyPost = (req, res) => {
    const id = req.params.id;
    const checkId = checkIdToken(req);
    const sanitizedContenu = req.sanitize(req.body.contenu);

    const messageObject = req.file ?
    {
        contenu: sanitizedContenu,
        image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ... req.body};

    if(messageObject.contenu === undefined || messageObject.contenu === null) {
        return res.status(400).json({ message: 'Votre message est vide' });
    } 

    // Vérification du bon utilisateur
    Post.findOne({ where: { id: id } })
    .then(post => {
        if (post.UserId !== checkId) {
            return res.status(404).json({ error })
        };
    })
    .catch(error => res.status(400).json({ error }));

    // Si il n'y a pas d'image, je supprime l'image précédente et écrit du texte
    if(req.file === undefined) {
        Post.findOne({ where: { id: id }})
        .then(imageId => {
            const filename = imageId.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.update({
                    ...messageObject, id: id},
                    { where: { id: id }
                })
                .then(() => res.status(201).json({ message: 'Post modifié !'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(400).json({ error }));
    // Si il y a une image, je supprime l'image précédente et écrit texte et remplace l'image
    } else {
        const photo = req.file.originalname;
        
        Post.findOne({ where: { id: id }})
        .then(imageId => {
            if (REGEX_IMAGE.test(photo)){
                return res.send( 'erreur : le nom de la photo est incorrect')
            }

            const filename = imageId.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.update({
                ...messageObject, id: id},
                { where: { id: id }}
                )
                .then(() => res.status(201).json({ message: 'Post Modifié avec une nouvelle image !'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(400).json({ error }));
    };
};

// Suppression d'un post par l'utilistateur et l'administrateur
exports.deletePost = (req, res) => {
    const id = req.params.id;
    const checkId = checkIdToken(req);

   Post.findOne({
    where: { id: id },
    attributes: ['image', 'UserId']
    })
    .then(post => {
        if (post.UserId === checkId) {
            console.log(post.image)
            if (post.image === null) {
                Post.destroy({ where: { id: id }})
                .then(() => res.status(201).json({ message: 'Post supprimé !' }))
                .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
            }
            const filename = post.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { id: id }})
                .then(() => res.status(201).json({ message: 'Post supprimé !' }))
                .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
            });
        } else if (checkAdmin) {
            if (post.image === null) {
                Post.destroy({ where: { id: id }})
                .then(() => res.status(201).json({ message: 'Post supprimé !' }))
                .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
            }
            const filename = post.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { id: id }})
                .then(() => res.status(201).json({ message: 'Post supprimé !' }))
                .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
            });
        };
    })
  .catch((error) => { res.status(500).json({ message: " erreur 500 - " + error })});
};