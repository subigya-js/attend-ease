import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrganizationCardProps {
  name: string;
  orgId: string;
  adminCount?: number;
  memberCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ name, orgId, adminCount, memberCount, createdAt, updatedAt }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Organization ID: {orgId}</p>
        {adminCount !== undefined && <p>Admins: {adminCount}</p>}
        {memberCount !== undefined && <p>Members: {memberCount}</p>}
        {createdAt && <p>Created At: {new Date(createdAt).toLocaleDateString()}</p>}
        {updatedAt && <p>Updated At: {new Date(updatedAt).toLocaleDateString()}</p>}
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Edit</button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
