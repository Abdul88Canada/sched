import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  // Extract the JWT from the request headers, query parameters, or cookies
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // If the token is missing, return an error response
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Split the Authorization header to get the token
    const token = authHeader.split(' ')[1];
    
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'test');

    // Attach the decoded token payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token verification fails, return an error response
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyToken;