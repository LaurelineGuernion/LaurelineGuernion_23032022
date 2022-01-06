const jwt = require('jsonwebtoken');

//////////////////// AUTHENTIFICATION AVEC UN TOKEN ////////////////////
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // Vérifier le token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    
    // Vérifier si l'Id correspond au Token
    if (req.body.userId && req.body.userId !== userId) {
      throw "L'Id user est non valable !";
    } else {
      next();
    }
  } catch(error) {res.status(401).json({message: ' erreur 401 - ' + error});
  }
};