import { Activity, ActivityDocument } from '../models/activity.model';

interface ActivityFilters {
  userId?: string;
  action?: string;
  severity?: string;
  status?: string;
  source?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export class ActivityService {
  async create(data: {
    action: string;
    entityType?: string;
    entityId?: string;
    userId: string;
    userName: string;
    userEmail?: string;
    details?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
    severity?: 'info' | 'warning' | 'critical';
    source?: 'beta' | 'core';
    status?: 'success' | 'failure';
  }): Promise<ActivityDocument> {
    return Activity.create({
      action: data.action,
      entityType: data.entityType || 'auth',
      entityId: data.entityId || '',
      userId: data.userId,
      userName: data.userName,
      userEmail: data.userEmail || '',
      details: data.details || {},
      ipAddress: data.ipAddress || '',
      userAgent: data.userAgent || '',
      severity: data.severity || 'info',
      source: data.source || 'beta',
      status: data.status || 'success',
    });
  }

  async findAll(filters: ActivityFilters) {
    const page = filters.page || 1;
    const limit = Math.min(filters.limit || 50, 200);
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    if (filters.userId) query.userId = filters.userId;
    if (filters.action) query.action = filters.action;
    if (filters.severity) query.severity = filters.severity;
    if (filters.status) query.status = filters.status;
    if (filters.source) query.source = filters.source;

    if (filters.from || filters.to) {
      const createdAt: Record<string, Date> = {};
      if (filters.from) createdAt.$gte = new Date(filters.from);
      if (filters.to) createdAt.$lte = new Date(filters.to);
      query.createdAt = createdAt;
    }

    const [activities, total] = await Promise.all([
      Activity.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Activity.countDocuments(query),
    ]);

    return {
      activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getStats() {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalEvents24h,
      totalEvents7d,
      activeUsers,
      failedAttempts,
      criticalAlerts,
      actionBreakdown,
      severityBreakdown,
      hourlyActivity,
    ] = await Promise.all([
      Activity.countDocuments({ createdAt: { $gte: last24h } }),
      Activity.countDocuments({ createdAt: { $gte: last7d } }),
      Activity.distinct('userId', { createdAt: { $gte: last24h } }),
      Activity.countDocuments({ status: 'failure', createdAt: { $gte: last24h } }),
      Activity.countDocuments({ severity: 'critical', createdAt: { $gte: last24h } }),
      Activity.aggregate([
        { $match: { createdAt: { $gte: last24h } } },
        { $group: { _id: '$action', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Activity.aggregate([
        { $match: { createdAt: { $gte: last24h } } },
        { $group: { _id: '$severity', count: { $sum: 1 } } },
      ]),
      Activity.aggregate([
        { $match: { createdAt: { $gte: last24h } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%dT%H:00:00', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    return {
      totalEvents24h,
      totalEvents7d,
      activeUsersCount: activeUsers.length,
      failedAttempts24h: failedAttempts,
      criticalAlerts24h: criticalAlerts,
      actionBreakdown: actionBreakdown.map((a: { _id: string; count: number }) => ({
        action: a._id,
        count: a.count,
      })),
      severityBreakdown: severityBreakdown.map((s: { _id: string; count: number }) => ({
        severity: s._id,
        count: s.count,
      })),
      hourlyActivity: hourlyActivity.map((h: { _id: string; count: number }) => ({
        hour: h._id,
        count: h.count,
      })),
    };
  }

  async getUserTimeline(userId: string, page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [activities, total] = await Promise.all([
      Activity.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Activity.countDocuments({ userId }),
    ]);

    return {
      activities,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }
}

export const activityService = new ActivityService();
