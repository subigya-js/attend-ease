export default interface OrganizationType {
    _id: string;
    id: string;
    name: string;
    orgId: string;
    admins?: Array<{ _id: string; name: string; email: string }>;
    members?: Array<{ _id: string; name: string; email: string }>;
    createdAt: Date;
    updatedAt: Date;
}
