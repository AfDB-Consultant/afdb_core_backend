import { Response } from 'express';
import { dashboardService } from '../services/dashboard.service';
import { AuthRequest } from '../types';

export class DashboardController {
  async getStats(_req: AuthRequest, res: Response): Promise<void> {
    const stats = await dashboardService.getStats();
    res.json({ success: true, data: stats });
  }
}

export const dashboardController = new DashboardController();
