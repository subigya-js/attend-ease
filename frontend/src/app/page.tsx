'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

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
