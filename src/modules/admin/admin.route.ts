import { Router } from 'express';
import { renderDashboard } from './admin.controller';
import { adminUserRouter } from './users/admin.users.route';

const router = Router();

router.get('/', renderDashboard);

router.use('/users', adminUserRouter);

export { router as adminRouter };
