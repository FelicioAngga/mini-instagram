import User from "../models/user";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../env";

const getProfile = (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (accessToken) accessToken = accessToken.substring(7, accessToken.length);
  else {
    res.statusCode = 401;
    res.json({message: 'Unauthorized', user: null});
    return;
  }
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
    res.statusCode = 200;
    User.findOne({ where: { username: decoded.username } }).then(result => {
      res.json({message: 'success', user: result});
    })
  } catch(err) {
    res.statusCode = 401;
    res.json({message: 'Unauthorized', user: null});
    return;
  }
}

const getProfileById = (req, res, next) => {
  const userId = req.param('userId');
  User.findOne({ where: {id: userId }}).then(result => {
    if (!result) res.status(400).json({message: 'user not found'});
    else res.status(200).json({ message: 'success', user: result });
  })
}

export default {
  getProfile,
  getProfileById,
}