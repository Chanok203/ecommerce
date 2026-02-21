import { Router } from 'express';
import { handleChangePassword, handleDeleteMe, handleUpdateMe, renderChangePasswordForm, renderUpdateMeForm } from './users.controller';
import { avatarUpload, resizeAvatar } from './users.upload';

const router = Router();

router.get('/me', renderUpdateMeForm);
router.post('/me', avatarUpload.single('avatar'), resizeAvatar, handleUpdateMe);

router.get('/me/change-password', renderChangePasswordForm);
router.post('/me/change-password', handleChangePassword);

router.post('/me/delete', handleDeleteMe);

export { router as usersRouter };
