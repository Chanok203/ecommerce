import { Router } from 'express';
import * as controller from './topup.controller';
import { topupUpload } from './topup.upload';

const router = Router();

router.get('/', controller.renderListTopup);
router.get('/create', controller.renderCreateTopupForm);
router.post('/create', topupUpload.single('image'), controller.handleCreateTopup);

export { router as topupRouter };
