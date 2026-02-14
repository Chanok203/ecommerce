import { Router } from 'express';
import { renderDashboard } from './admin.controller';

const router = Router();

router.get('/', renderDashboard);

export { router as adminRouter };
