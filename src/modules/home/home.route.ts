import { Router } from 'express';
import { renderHome } from './home.controller';

const router = Router();

router.get('/', renderHome);

export { router as homeRouter };
