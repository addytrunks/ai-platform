import React from 'react'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Bars3Icon } from '@heroicons/react/24/outline'

const Navbar = () => {
  return (
    <div className='flex items-center p-4'>
        <Button variant='ghost' size='icon' className='md:hidden'>
            <Bars3Icon/>
        </Button>

        <div className='flex w-full justify-end'>
            <UserButton afterSignOutUrl='/sign-in'/>
        </div>
    </div>
  )
}

export default Navbar