import express from 'express';
import postController from '../controllers/postController.js';

const router = express.Router();

router.post('/create', [postController.checkAuth, postController.checkImageSize], postController.addPost);
router.get('/all', postController.checkAuth, postController.getAllPost);
router.delete('/delete/:postId', postController.checkDeleteAuth, postController.deletePost);

export default router;