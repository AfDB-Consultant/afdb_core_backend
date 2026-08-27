import { Router } from 'express';
import projectRoutes from './project.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
