import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

export interface IProject {
  _id: string;
  name: string;
  code: string;
  status: 'active' | 'completed' | 'on-hold';
  country: string;
  budget: number;
  currency: string;
  sector: string;
  startDate: Date;
  endDate?: Date;
  manager: string;
}

export interface IDashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalBudget: number;
  countriesCount: number;
  recentActivity: { action: string; timestamp: Date; user: string }[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: { page: number; limit: number; total: number; pages: number };
}
