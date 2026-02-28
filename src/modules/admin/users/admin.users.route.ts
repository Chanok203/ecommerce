import { Router } from 'express';
import { handleCreateUser, handleDeleteUser, handleUpdateUser, renderAllUsers, renderCreateUserForm, renderUpdateUserForm } from './admin.users.controller';

const router = Router();

router.get('/', renderAllUsers);

router.get('/create', renderCreateUserForm);
router.post('/create', handleCreateUser);

router.get('/:id/update', renderUpdateUserForm);
router.post('/:id/update', handleUpdateUser);

router.post('/:id/delete', handleDeleteUser);

export { router as adminUserRouter };
