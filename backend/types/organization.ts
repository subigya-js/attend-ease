import { Document, Types } from "mongoose";

export interface OrganizationType extends Document {
  name: string;
  orgId: string;
  admins: Types.ObjectId[];
  members: Types.ObjectId[];
  holidays: string[];
  createdAt: Date;
  updatedAt: Date;
}