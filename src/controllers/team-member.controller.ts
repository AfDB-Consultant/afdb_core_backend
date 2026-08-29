import { Request, Response } from 'express';
import { teamMemberService } from '../services/team-member.service';

export class TeamMemberController {
  async findAll(req: Request, res: Response): Promise<void> {
    const { role, status, department, page, limit } = req.query;
    const result = await teamMemberService.findAll({
      role: role as string,
      status: status as string,
      department: department as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json({
      success: true,
      data: result.members,
      pagination: {
        page: result.page,
        limit: parseInt(limit as string) || 20,
        total: result.total,
        pages: result.pages,
      },
    });
  }

  async findById(req: Request, res: Response): Promise<void> {
    const member = await teamMemberService.findById(req.params.id);
    if (!member) { res.status(404).json({ success: false, message: 'Team member not found' }); return; }
    res.json({ success: true, data: member });
  }

  async create(req: Request, res: Response): Promise<void> {
    const member = await teamMemberService.create(req.body);
    res.status(201).json({ success: true, message: 'Team member created', data: member });
  }

  async update(req: Request, res: Response): Promise<void> {
    const member = await teamMemberService.update(req.params.id, req.body);
    if (!member) { res.status(404).json({ success: false, message: 'Team member not found' }); return; }
    res.json({ success: true, message: 'Team member updated', data: member });
  }

  async updatePermissions(req: Request, res: Response): Promise<void> {
    const { permissions } = req.body;
    if (!permissions || !Array.isArray(permissions)) {
      res.status(400).json({ success: false, message: 'Permissions array is required' });
      return;
    }
    const member = await teamMemberService.updatePermissions(req.params.id, permissions);
    if (!member) { res.status(404).json({ success: false, message: 'Team member not found' }); return; }
    res.json({ success: true, message: 'Permissions updated', data: member });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const deleted = await teamMemberService.delete(req.params.id);
    if (!deleted) { res.status(404).json({ success: false, message: 'Team member not found' }); return; }
    res.json({ success: true, message: 'Team member deleted' });
  }
}

export const teamMemberController = new TeamMemberController();
