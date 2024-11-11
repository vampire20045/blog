import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });
const Sec = process.env.SECRET;
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, Sec, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


export default auth;
