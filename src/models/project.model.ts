import mongoose, { Schema, Document } from 'mongoose';

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
}

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
  },
  { timestamps: true }
);

projectSchema.index({ status: 1, country: 1 });
export const Project = mongoose.model<ProjectDocument>('Project', projectSchema);
