import { Router } from 'express';
import { handleLogin, handleLogout, handleRegister, renderLoginForm, renderRegisterForm } from './auth.controller';
import { avatarUpload, resizeAvatar } from '../users/users.upload';

const router = Router();

router.get('/login', renderLoginForm);
router.post('/login', handleLogin);

router.post('/logout', handleLogout);

router.get('/register', renderRegisterForm);
router.post('/register', avatarUpload.single('avatar'), resizeAvatar, handleRegister);

export { router as authRouter };
