const db = require('../models');
const Comment = db.Comment;
const User = db.User;
const checkIdToken = require('../middelware/check-id-token');
const checkAdmin = require('../middelware/check-admin');

// Création d'un commentaire
exports.createComment = (req, res) => {
    const checkId = checkIdToken(req);
    const sanitizedContenu = req.sanitize(req.body.contenu);

    const comment = new Comment(
        {
            UserId: checkId,
            PostId: req.body.PostId,
            contenu: sanitizedContenu
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

// Modification du commentaire
exports.modifyComment = (req, res) => {
    const id = req.params.id;
    const checkId = checkIdToken(req);
    const sanitizedContenu = req.sanitize(req.body.contenu);

    if(req.body.contenu === undefined || req.body.contenu === '') {
        return res.status(400).json({ message: 'Votre message est vide' });
    }

    Comment.findOne({ where: { id: id }})
    .then(commentId => {
      if (!commentId) {
        return res.status(401).json({ error: 'Id non valide !' });
      } else if (commentId.UserId !== checkId) {
        return res.status(404).json({ error: 'l\'id de l\'utilisateur est invalide' })
      }  
    })
    .catch((error) => { res.status(500).json({ message: ' erreur serveur - ' + error })})
    
    Comment.update({ contenu: sanitizedContenu }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
    .catch((error) => { res.status(404).json({ message: ' erreur 404 - ' + error })})
};

// Suppression du commentaire par l'utilisateur ou l'admin
exports.deleteComment = (req, res) => {
    const id = req.params.id;
    const checkId = checkIdToken(req);

    Comment.findOne({
        where: { id: id },
        attributes: ['UserId']
        })

    .then(comment => {
        if (comment.UserId === checkId) {
            Comment.destroy({ where: { id: id }})
            .then(() => res.status(201).json({ message: 'Commentaire supprimé !' }))
            .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
        } else if (checkAdmin) {
            Comment.destroy({ where: { id: id }})
            .then(() => res.status(201).json({ message: 'Commentaire supprimé par l\'administrateur !' }))
            .catch((error) => { res.status(400).json({ message: " erreur 400 - " + error })});
     };
  })
  .catch((error) => { res.status(500).json({ message: " erreur 500 - " + error })});
};