import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from '@/components/mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscriptions } from '@/lib/subscription'

const Navbar = async () => {

  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscriptions()
  return (
    <div className='flex items-center p-4'>
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount}/>

        <div className='flex w-full justify-end'>
            <UserButton afterSignOutUrl='/sign-in'/>
        </div>
    </div>
  )
}

export default Navbar