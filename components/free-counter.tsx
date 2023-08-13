import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MAX_FREE_COUNTS } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BoltIcon } from '@heroicons/react/24/outline'

interface FreeCounterProps{
    apiLimitCount:number
}

const FreeCounter = ({apiLimitCount}:FreeCounterProps) => {

    const [isMounted,setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if(!isMounted) return;

  return (
    <div className='px-3'>
        <Card className='bg-white/10 border-0'>
            <CardContent className='py-6'>
                <div className='text-center text-sm text-white mb-4 space-y-2'>
                    <p>{apiLimitCount}/{MAX_FREE_COUNTS} Free Generations</p>
                    <Progress className='h-3 ' value={(apiLimitCount/MAX_FREE_COUNTS)*100}/>
                </div>
                <Button className='w-full' variant='premium'>
                    Upgrade
                    <BoltIcon className='w-4 h-4 ml-2 fill-white'/>
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default FreeCounter