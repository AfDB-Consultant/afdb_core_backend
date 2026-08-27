import mongoose, { Schema, Document } from 'mongoose';

export interface ActivityDocument extends Document {
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  userName: string;
  details: Record<string, unknown>;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

activitySchema.index({ createdAt: -1 });
export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
