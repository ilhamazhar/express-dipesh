import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized!');
      }
      // console.log(decode);
      req.user = decode.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error('User is not authorized or token is missing!');
    }
  }
});

export default validateToken;
