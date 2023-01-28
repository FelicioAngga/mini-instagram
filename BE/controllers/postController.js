import Post from "../models/post";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../env";

const addPost = (req, res, next) => {
  if (req.files.image) {
    let accessToken = req.headers.authorization;
    if (accessToken) accessToken = accessToken.substring(7, accessToken.length);
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
    Post.create({
      caption: req.body.caption,
      image: req.files.image.data,
      user_id: decoded.id,
    }).then(result => {
      if (result) res.status(200).json({message: 'success'});
      else res.status(400).json({message: 'upload post failed'});
    })
  } else {
    res.status(400).json({message: 'upload post failed'});
  }
}

const deletePost = (req, res, next) => {
  const postId = req.param('postId');
  Post.destroy({ where: {id: postId}}).then(result => {
    if (result) res.status(200).json({message: 'success'});
    else res.status(400).json({message: 'delete post failed'});
  })
}

const getAllPost = (req, res, next) => {
  Post.findAll().then(results => {
    res.status(200).json({
      message: 'success',
      posts: results,
    });
  });
}

const checkAuth = (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (accessToken) accessToken = accessToken.substring(7, accessToken.length);
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
  } catch(err) {
    res.statusCode = 401;
    res.json({message: 'Unauthorized', err});
    return;
  }
  next();
}

const checkDeleteAuth = (req, res, next) => {
  const postId = req.param('postId');
  let accessToken = req.headers.authorization;
  if (accessToken) accessToken = accessToken.substring(7, accessToken.length);
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
    Post.findOne({ where: { id: postId } }).then(result => {
      if (decoded.id !== result.user_id) {
        res.status(401).json({message: 'Unauthorized'});
        return;
      } else next();
    });
  } catch(err) {
    res.statusCode = 401;
    res.json({message: 'Unauthorized', err});
    return;
  }
}

const checkImageSize = (req, res, next) => {
  if (req.files.image) {
    if (req.files.image.size > 1048576)
      return res.status(400).json({message: 'Ukuran file harus lebih kecil dari 1 MB'});
  }
  next();
}

export default {
  addPost,
  checkImageSize,
  getAllPost,
  checkAuth,
  checkDeleteAuth,
  deletePost,
}