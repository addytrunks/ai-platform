"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from '@/components/ui/badge'
import { cn, tools } from '@/lib/utils'
import { Card } from './ui/card'
import { BoltIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/button'
import axios from 'axios'

const ProModal = () => {

  const {isOpen,onClose} = useProModal()
  const [loading,setLoading] = useState(false)

  const onSubscribe = async() => {
    try {
      setLoading(true)
      const res = await axios.get('/api/stripe')
      window.location.href = res.data.url;
    } catch (error) {
      console.log('STRIPE_CLIENT_ERROR')
    }finally{
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 font-bold py-1'>
              Upgrade to Genius
              <Badge variant='premium' className='py-1 text-sm'>PRO</Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
              {tools.map((tool) => (
                <Card key={tool.label} className='p-3 border-black/5 flex items-center justify-between'>
                    <div className='flex items-center gap-x-4'>
                      <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                        <tool.icon className={cn("w-6 h-6",tool.color)}/>
                      </div>
                      <div className='font-semibold text-sm'>
                        {tool.label}
                      </div>
                    </div>
                    <CheckIcon className='text-primary w-5 h-5'/> 
                </Card>
              ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubscribe} size='lg' variant='premium' className='w-full'>
            Upgrade
            <BoltIcon className='w-4 h-4 ml-2 fill-white'/>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal