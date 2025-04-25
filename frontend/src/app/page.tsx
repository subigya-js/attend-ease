'use client';

import OrganizationCard from '@/components/organizations/OrganizationCard';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NoOrganizations from './organizations/page';

interface Organization {
  _id: string;
  name: string;
  orgId: string;
  admins: Array<{ _id: string; name: string; email: string }>;
  members: Array<{ _id: string; name: string; email: string }>;
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiUrl) {
          throw new Error('API URL is not defined');
        }
        console.log('Fetching data from:', apiUrl);
        const response = await fetch(`${apiUrl}/api/organizations`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrganizations(data);
        console.log('Data from API:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGetStarted = () => {
    router.push('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-h-[90vh] flex justify-center items-center h-[90vh]">
      <main className="flex flex-col gap-[32px] items-center text-center max-w-2xl">
        {organizations.length === 0 ? (
          <NoOrganizations />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations.map((org) => (
              <OrganizationCard
                key={org._id}
                name={org.name}
                orgId={org.orgId}
                adminCount={org.admins.length}
                memberCount={org.members.length}
              />
            ))}
          </div>
        )}
        <Button variant="outline" className="border border-primary" onClick={handleGetStarted}>Get Started</Button>
      </main>
    </div>
  );
}
