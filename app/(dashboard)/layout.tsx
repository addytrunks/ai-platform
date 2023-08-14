import '@/app/globals.css'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscriptions } from '@/lib/subscription'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscriptions()
  return (
    <div className='h-full relative'>
        <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900'>
            <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
        </div>
        <main className='md:pl-72'>
            <Navbar/>
            {children}
        </main>
    </div>
  )
}
