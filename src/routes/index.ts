import { Router } from 'express';
import projectRoutes from './project.routes';
import dashboardRoutes from './dashboard.routes';
import activityRoutes from './activity.routes';
import teamMemberRoutes from './team-member.routes';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/activities', activityRoutes);
router.use('/team', teamMemberRoutes);

export default router;
