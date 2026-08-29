import mongoose, { Schema, Document } from 'mongoose';

export interface Milestone {
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  date: Date;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
}

export interface ProjectDocument extends Document {
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
  description: string;
  milestones: Milestone[];
  team: TeamMember[];
  progress: number;
}

const milestoneSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['completed', 'in-progress', 'pending'], default: 'pending' },
  date: { type: Date, required: true },
}, { _id: false });

const teamMemberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  initials: { type: String, required: true },
  color: { type: String, default: 'bg-blue-500' },
}, { _id: false });

const projectSchema = new Schema<ProjectDocument>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true },
    status: { type: String, enum: ['active', 'completed', 'on-hold'], default: 'active' },
    country: { type: String, required: true },
    budget: { type: Number, required: true, default: 0 },
    currency: { type: String, default: 'USD' },
    sector: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    manager: { type: String, required: true },
    description: { type: String, default: '' },
    milestones: { type: [milestoneSchema], default: [] },
    team: { type: [teamMemberSchema], default: [] },
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

projectSchema.index({ status: 1, country: 1 });
export const Project = mongoose.model<ProjectDocument>('Project', projectSchema);
