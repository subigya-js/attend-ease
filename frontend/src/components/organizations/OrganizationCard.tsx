import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '../ui/button';

interface OrganizationCardProps {
  name: string;
  orgId: string;
  adminCount?: number;
  memberCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ name, orgId, updatedAt }) => {
  return (
    <Card className='w-[80%] cursor-pointer shadow-lg hover:bg-gray-100/50 duration-200 relative' onClick={() => console.log('Card clicked')}>
      {/* Edit Button Top Right */}
      <Button
        variant="outline"
        className="absolute top-4 right-4 px-4 py-2 rounded z-10"
        onClick={(e) => {
          e.stopPropagation(); // prevents card click event
          console.log('Edit clicked');
        }}
      >
        Edit
      </Button>

      <CardHeader>
        <CardTitle className='font-bold'>{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-4'>
          <p className='text-sm italic'>Organization ID: {orgId}</p>

          <div className='flex flex-col text-sm justify-between'>
            {updatedAt && <p>Last Updated: {new Date(updatedAt).toLocaleDateString()}</p>}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button className="p-2 rounded">Enter Organization</Button>
          <Button className="p-2 rounded">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
