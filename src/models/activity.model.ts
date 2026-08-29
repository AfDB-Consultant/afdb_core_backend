import mongoose, { Schema, Document } from 'mongoose';

export interface ActivityDocument extends Document {
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  userName: string;
  userEmail: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  severity: 'info' | 'warning' | 'critical';
  source: 'beta' | 'core';
  status: 'success' | 'failure';
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    action: { type: String, required: true },
    entityType: { type: String, default: 'auth' },
    entityId: { type: String, default: '' },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, default: '' },
    details: { type: Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    severity: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
    source: { type: String, enum: ['beta', 'core'], default: 'beta' },
    status: { type: String, enum: ['success', 'failure'], default: 'success' },
  },
  { timestamps: true }
);

activitySchema.index({ createdAt: -1 });
activitySchema.index({ userId: 1, createdAt: -1 });
activitySchema.index({ severity: 1, createdAt: -1 });
activitySchema.index({ action: 1, createdAt: -1 });

export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
