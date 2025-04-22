'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch data: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    fetchData();
  }, []);

  console.log(error)
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
