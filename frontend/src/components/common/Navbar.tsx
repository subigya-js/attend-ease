import Logo from "../../../public/assets/logo.png"
import Image from 'next/image'
import React from 'react'

const Navbar: React.FC = () => {
  return (
    <div className="bg-gray-100 shadow-md p-4 max-h-[10vh] h-[10vh] flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" width={50} height={50} className="rounded-full" />
        <p className='text-xl font-bold text-primary'>Attend Ease</p>
      </div>
    </div>
  )
}

export default Navbar
