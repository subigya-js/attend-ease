"use client"

import Logo from "../../../public/assets/logo.png"
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import OrgIdModal from "@/components/modals/OrgIdModal";

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showCreateJoinButton = isAuthenticated && pathname === '/organizations';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitOrgId = (orgId: string) => {
    console.log('Organization ID submitted:', orgId);
    // Here you can add logic to handle the submitted orgId
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 shadow-md p-4 max-h-[10vh] h-[10vh] flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={50} height={50} className="rounded-full" />
        <p className='text-xl font-bold text-primary cursor-pointer' onClick={() => router.push('/')}>Attend Ease</p>
      </div>
      {showCreateJoinButton && (
        <Button variant="outline" onClick={handleOpenModal}>
          Join or Create
        </Button>
      )}
      <OrgIdModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitOrgId}
      />
    </div>
  )
}

export default Navbar
