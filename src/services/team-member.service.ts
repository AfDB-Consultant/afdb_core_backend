import { TeamMember, TeamMemberDocument } from '../models/team-member.model';
import { redis } from '../config/redis';
import { logger } from '../config/logger';

export class TeamMemberService {
  async findAll(query: { role?: string; status?: string; department?: string; page?: number; limit?: number }): Promise<{
    members: TeamMemberDocument[];
    total: number;
    page: number;
    pages: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const filter: Record<string, string> = {};
    if (query.role) filter.role = query.role;
    if (query.status) filter.status = query.status;
    if (query.department) filter.department = query.department;

    const cacheKey = `team:${JSON.stringify(filter)}:${page}:${limit}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const [members, total] = await Promise.all([
      TeamMember.find(filter).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 }),
      TeamMember.countDocuments(filter),
    ]);

    const result = { members, total, page, pages: Math.ceil(total / limit) };
    await redis.set(cacheKey, JSON.stringify(result), 'EX', 300);
    return result;
  }

  async findById(id: string): Promise<TeamMemberDocument | null> {
    return TeamMember.findById(id);
  }

  async create(data: Partial<TeamMemberDocument>): Promise<TeamMemberDocument> {
    const member = await TeamMember.create(data);
    logger.info(`Team member created: ${member.email}`);
    await redis.del('team:*');
    return member;
  }

  async update(id: string, data: Partial<TeamMemberDocument>): Promise<TeamMemberDocument | null> {
    const member = await TeamMember.findByIdAndUpdate(id, data, { new: true });
    if (member) {
      logger.info(`Team member updated: ${member.email}`);
      await redis.del('team:*');
    }
    return member;
  }

  async updatePermissions(id: string, permissions: { resource: string; actions: string[] }[]): Promise<TeamMemberDocument | null> {
    const member = await TeamMember.findByIdAndUpdate(id, { permissions }, { new: true });
    if (member) {
      logger.info(`Permissions updated for: ${member.email}`);
      await redis.del('team:*');
    }
    return member;
  }

  async delete(id: string): Promise<boolean> {
    const result = await TeamMember.findByIdAndDelete(id);
    if (result) await redis.del('team:*');
    return !!result;
  }
}

export const teamMemberService = new TeamMemberService();
