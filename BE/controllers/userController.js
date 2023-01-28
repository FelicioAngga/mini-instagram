import User from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET_KEY } from "../env";

const register = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.statusCode = 400;
    res.json({message: 'Username / Password Empty'});
    return;
  }

  User.findOne({ where: { username: req.body.username } }).then(results => {
    if (results) {
      res.statusCode = 400;
      res.json({message: 'Username already exists'});
    } else {
      bcrypt.hash(req.body.password, 15).then(hash => {
        User.create({
          username: req.body.username, password: hash, isAdmin: false
        });
      });
      res.statusCode = 200;
      res.json({message: 'success'});
    }
  });
}

const logout = (req, res, next) => {
  res.json({message: 'success'})
}

const auth = (req, res, next) => {
  const data = {
    username: req.body.username, password: req.body.password,
  };
  
  User.findOne({ where: { username: data.username } }).then(results => {
    if (!results) {
      res.statusCode = 400;
      res.json({message:'Username or Password is wrong'});
      return;
    }
    bcrypt.compare(req.body.password, results.password).then(compareResult => {
      if (!compareResult) {
        res.statusCode = 400
        res.json({message:'Password is wrong'});
      } else {
        res.statusCode = 200;
        const username = data.username;
        const id = results.id;
        const token = jwt.sign({
          id, username,
        }, JWT_SECRET_KEY, {expiresIn: '24h'});
        res.json({message: 'success', accessToken: token})
      }
    })
  }).catch(err => {
    res.json({message: err})
  });
}

const changePassword = (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (accessToken) accessToken = accessToken.substring(7, accessToken.length);
  const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
  bcrypt.hash(req.body.password, 15).then(hashPass => {
    User.update({ 
      password: hashPass
    }, { where: { id: decoded.id }}).then(result => {
      if (result) res.status(200).json({message: 'success'});
      else res.status(400).json({message: 'fail'});
    });
  });
}

const isUserStillAuthed = (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (accessToken) accessToken = accessToken.substring(7, accessToken.length);
  else {
    res.json({message: 'fail'});
    return;
  }
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
    res.json({message: 'success'})
  } catch(err) {
    res.json({message: 'fail'});
    return;
  }
}

export default {
  auth,
  logout,
  register,
  isUserStillAuthed,
  changePassword,
};