const db = require('../models');
const Comment   = db.Comment;
const User   = db.User;

// Création d'un commentaire
exports.createComment = (req, res) => {
    const comment = new Comment(
        {
            UserId: req.body.UserId,
            PostId: req.body.PostId,
            contenu: req.body.contenu
        }
    )
    comment.save()
        .then(() => res.status(201).json({ message: 'Ajout commentaire' }))
        .catch((error) => { res.status(400).json({ message: ' erreur 400 - ' + error })})
};


// Afficher tous les commentaires d'un post
exports.AllCommentsPost = (req, res) => {
    Comment.findAll({
        where: { PostId: req.params.id },
        attributes: [ 'postId','contenu', 'id'],
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['nom', 'prenom', 'photo', 'id']
        }]
    })
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Afficher tous les commentaires de l'utiliseur sur son profil
exports.CommentsProfil = (req, res) => {

    Comment.findAll({
        where: { UserId: req.params.id },
        attributes: [ 'postId','contenu'],
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['nom', 'prenom', 'photo']
        }]
    })
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })}) 
};


// Modification du commentaire
exports.modifyComment = (req, res) => {
    const id = req.params.id;

    if(req.body.contenu === undefined || req.body.contenu === '') {
        return res.status(400).json({ message: 'Votre message est vide' });
    }

    Comment.findOne({ where: { id: id }})
    .then(commentId => {
      if (!commentId) {
        return res.status(401).json({ error: 'Id non valide !' });
      }})
    .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
    
    Comment.update({ ...req.body }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Suppression du commentaire
exports.deleteComment = (req, res) => {
    Comment.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};