const db = require('../models/index');
const Comment   = db.comment;
const User   = db.user;

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
        attributes: [ 'PostId','contenu'],
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            attributes: ['nom', 'prenom', 'photo']
        }]
    })
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Afficher tous les commentaires de l'utiliseur sur son profil
exports.CommentsProfil = (req, res) => {
    Comment.findAll({
        where: { UserId: req.params.id },
        attributes: [ 'PostId','contenu'],
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
    if(req.body.contenu === undefined || req.body.contenu === '') {
        return res.status(400).json({ message: 'Votre message est vide' });
    }
    
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

// Suppression d'un commentaire par l'administrateur - à tester en front-end
exports.adminDeleteComment = (req, res) => {
    const id = req.params.id;

    User.findAll()
    .then(user => {
      if (user.isAdmin) {
        Comment.destroy ({ where: { id: id }})
            .then(() => res.status(201).json({ message: 'Commentaire supprimé par l\'administrateur !' }))
            .catch((error) => { res.status(400).json({ message: " erreur 400 " + error })});
      } else {
        res.status(401).json({message : " Non autorisé " });
      }
    })
    .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
  };