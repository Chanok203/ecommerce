import { Router } from 'express';
import { handleLogin, renderLoginForm } from './auth.controller';

const router = Router();

router.get('/login', renderLoginForm);
router.post('/login', handleLogin);

export { router as authRouter };
