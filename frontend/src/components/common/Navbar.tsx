"use client"

import Logo from "../../../public/assets/logo.png"
import Image from 'next/image'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const router = useRouter();
  const pathname = usePathname();

  const showCreateJoinButton = isAuthenticated && pathname === '/organizations';

  return (
    <div className="bg-gray-100 shadow-md p-4 max-h-[10vh] h-[10vh] flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={50} height={50} className="rounded-full" />
        <p className='text-xl font-bold text-primary cursor-pointer' onClick={() => router.push('/')}>Attend Ease</p>
      </div>
      {showCreateJoinButton && (
        <Button variant="outline" onClick={() => console.log('Join or Create clicked from Navbar')}>
          Join or Create
        </Button>
      )}
    </div>
  )
}

export default Navbar
