import mongoose, { Schema } from "mongoose";
import { OrganizationType } from "../types/organization";

const OrganizationSchema = new Schema<OrganizationType>(
    {
        name: { type: String, required: true },
        orgId: { type: String, required: true, unique: true },
        admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
        members: [{ type: Schema.Types.ObjectId, ref: "User" }],
        holidays: [{ type: String }],
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    { timestamps: true }
);

const Organization = mongoose.model<OrganizationType>(
    "Organization",
    OrganizationSchema
);
export default Organization;
