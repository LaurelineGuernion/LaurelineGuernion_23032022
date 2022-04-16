const jwt = require("jsonwebtoken");

const checkIdToken = (req) => {
    // Récupération du token
    const token = req.headers.authorization.split(' ')[1];
    // Vérification/décodage du token 
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // Vérification userId
    const userId = decodedToken.userId;
    return userId;
};

module.exports = checkIdToken;