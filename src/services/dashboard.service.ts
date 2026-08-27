import { Project } from '../models/project.model';
import { Activity } from '../models/activity.model';
import { redis } from '../config/redis';

export class DashboardService {
  async getStats() {
    const cacheKey = 'dashboard:stats';
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const [totalProjects, activeProjects, budgetAgg, countries, recentActivity] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'active' }),
      Project.aggregate([{ $group: { _id: null, total: { $sum: '$budget' } } }]),
      Project.distinct('country'),
      Activity.find().sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    const stats = {
      totalProjects,
      activeProjects,
      totalBudget: budgetAgg[0]?.total || 0,
      countriesCount: countries.length,
      recentActivity: recentActivity.map((a) => ({
        action: a.action,
        timestamp: a.createdAt,
        user: a.userName,
        entityType: a.entityType,
      })),
    };

    await redis.set(cacheKey, JSON.stringify(stats), 'EX', 120);
    return stats;
  }
}

export const dashboardService = new DashboardService();
