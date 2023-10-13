const jwt = require("jsonwebtoken");

exports.authGuard = (options) => async function (req, res, next) {
  const jwtAuthEnabled = options.JWTAuth;
  if (jwtAuthEnabled) {

    // Both JWT and Basic Authentication are enabled
    const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        // Extract the JWT token from the 'Authorization' header
        const token = authorizationHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid JWT token' });
        }
    }

    return res.status(401).json({ message: 'Missing Authorization header' });
}

}
