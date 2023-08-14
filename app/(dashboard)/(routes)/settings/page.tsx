import Heading from '@/components/heading'
import { SubscriptionButton } from '@/components/subscription-button'
import { checkSubscriptions } from '@/lib/subscription'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import React from 'react'

const SettingsPage = async() => {

    const isPro = await checkSubscriptions()

  return (
    <div>
        <Heading title='Settings' description='Manage Account Settings' icon={Cog6ToothIcon} iconColor='text-gray-700' bgColor='text-gray-700/10'/>

        <div className='px-4 lg:px-8 space-y-4'>
            <div className='text-muted-foreground text-sm'>
                {isPro ? 'You are currently on a Pro plan':'You are currently on a Free plan'}
            </div>
            <SubscriptionButton isPro={isPro}/>
        </div>
    </div>
  )
}

export default SettingsPage