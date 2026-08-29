import { Request, Response } from 'express';
import { activityService } from '../services/activity.service';
import { AuthRequest } from '../types';

export class ActivityController {
  /**
   * POST /activities
   * Protected by internalApiAuth (x-api-key) — called from Beta backend
   */
  async create(req: Request, res: Response): Promise<void> {
    const {
      action, entityType, entityId, userId, userName, userEmail,
      details, ipAddress, userAgent, severity, source, status,
    } = req.body;

    if (!action || !userId || !userName) {
      res.status(400).json({ success: false, message: 'action, userId, and userName are required' });
      return;
    }

    const activity = await activityService.create({
      action, entityType, entityId, userId, userName, userEmail,
      details, ipAddress, userAgent, severity, source, status,
    });

    res.status(201).json({ success: true, data: activity });
  }

  /**
   * GET /activities
   * Protected by authenticate (JWT) — called from Core frontend
   */
  async findAll(req: AuthRequest, res: Response): Promise<void> {
    const { userId, action, severity, status, source, from, to, page, limit } = req.query;

    const result = await activityService.findAll({
      userId: userId as string,
      action: action as string,
      severity: severity as string,
      status: status as string,
      source: source as string,
      from: from as string,
      to: to as string,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });

    res.json({ success: true, data: result.activities, pagination: result.pagination });
  }

  /**
   * GET /activities/stats
   * Protected by authenticate (JWT) — called from Core frontend
   */
  async getStats(_req: AuthRequest, res: Response): Promise<void> {
    const stats = await activityService.getStats();
    res.json({ success: true, data: stats });
  }

  /**
   * GET /activities/users/:userId
   * Protected by authenticate (JWT) — called from Core frontend
   */
  async getUserTimeline(req: AuthRequest, res: Response): Promise<void> {
    const { userId } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;

    const result = await activityService.getUserTimeline(userId, page);
    res.json({ success: true, data: result.activities, pagination: result.pagination });
  }
}

export const activityController = new ActivityController();
