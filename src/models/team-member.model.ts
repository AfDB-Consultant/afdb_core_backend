import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'admin' | 'manager' | 'staff' | 'viewer';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface TeamMemberDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  department: string;
  location: string;
  jobTitle: string;
  bio?: string;
  avatar?: string;
  permissions: Permission[];
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const permissionSchema = new Schema({
  resource: { type: String, required: true },
  actions: [{ type: String }],
}, { _id: false });

const teamMemberSchema = new Schema<TeamMemberDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    role: { type: String, enum: ['admin', 'manager', 'staff', 'viewer'], default: 'viewer' },
    department: { type: String, required: true },
    location: { type: String, required: true },
    jobTitle: { type: String, required: true },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    permissions: { type: [permissionSchema], default: [] },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

teamMemberSchema.virtual('fullName').get(function (this: TeamMemberDocument) {
  return `${this.firstName} ${this.lastName}`;
});

teamMemberSchema.virtual('initials').get(function (this: TeamMemberDocument) {
  return `${this.firstName[0] || ''}${this.lastName[0] || ''}`.toUpperCase();
});

teamMemberSchema.set('toJSON', { virtuals: true });
teamMemberSchema.set('toObject', { virtuals: true });

export const TeamMember = mongoose.model<TeamMemberDocument>('TeamMember', teamMemberSchema);
