'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './sidebar'

const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <Button variant='ghost' size='icon' className='md:hidden'>
                <Bars3Icon/>
            </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0'>
            <Sidebar/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar