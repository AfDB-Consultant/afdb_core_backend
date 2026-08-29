import { Router } from 'express';
import { teamMemberController } from '../controllers/team-member.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, teamMemberController.findAll.bind(teamMemberController));
router.get('/:id', authenticate, teamMemberController.findById.bind(teamMemberController));
router.post('/', authenticate, teamMemberController.create.bind(teamMemberController));
router.put('/:id', authenticate, teamMemberController.update.bind(teamMemberController));
router.put('/:id/permissions', authenticate, teamMemberController.updatePermissions.bind(teamMemberController));
router.delete('/:id', authenticate, teamMemberController.delete.bind(teamMemberController));

export default router;
