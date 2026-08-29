import { Router } from 'express';
import { activityController } from '../controllers/activity.controller';
import { authenticate, internalApiAuth } from '../middleware/auth.middleware';

const router = Router();

// Internal endpoint — Beta backend sends auth events here (x-api-key)
router.post('/', internalApiAuth, activityController.create.bind(activityController));

// Frontend endpoints — Core frontend dashboard (JWT auth)
router.get('/', authenticate, activityController.findAll.bind(activityController));
router.get('/stats', authenticate, activityController.getStats.bind(activityController));
router.get('/users/:userId', authenticate, activityController.getUserTimeline.bind(activityController));

export default router;
