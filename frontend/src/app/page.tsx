'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiUrl) {
          throw new Error('API URL is not defined');
        }
        console.log('Fetching data from:', apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data from API:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(isLoading)


  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="max-h-[90vh] flex justify-center items-center h-[90vh]">
      <main className="flex flex-col gap-[32px] items-center text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-4">Simplify Your Attendance Management</h2>
        <p className="text-xl mb-8">
          Attend-Ease is your all-in-one solution for effortless attendance tracking and management.
        </p>

        <Button variant="outline" className="border border-primary" onClick={handleGetStarted}>Get Started</Button>
      </main>
    </div>
  );
}
