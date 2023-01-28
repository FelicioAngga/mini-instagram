import express from 'express';
import userController from '../controllers/userController.js';
import profileController from '../controllers/profileController.js';
import postController from '../controllers/postController.js';

const router = express.Router();

router.post('/login', userController.auth);
router.post('/signup', userController.register)
router.post('/logout', userController.logout);
router.put('/change-pass', postController.checkAuth, userController.changePassword);
router.put('/change-image', [postController.checkAuth, postController.checkImageSize], userController.changeImage);
router.get('/check-auth', userController.isUserStillAuthed);
router.get('/get-profile', postController.checkAuth, profileController.getProfile);
router.get('/get-profile/:userId', postController.checkAuth, profileController.getProfileById);

export default router;