'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthController';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/organizations');
    }
  }, [isLoggedIn, router]);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/organizations');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <main className="text-center">
        <h1 className="text-5xl font-bold mb-8">Welcome to Attend Ease</h1>
        <p className="text-xl mb-12">Simplify your attendance management with our intuitive platform.</p>
        <Button
          variant="default"
          size="lg"
          className="transition-colors duration-300"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </main>
    </div>
  );
}
