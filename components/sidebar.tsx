"use client"

import { cn } from "@/lib/utils"
import { ChatBubbleLeftIcon, CodeBracketIcon, Cog6ToothIcon, MusicalNoteIcon, PhotoIcon, RectangleGroupIcon, VideoCameraSlashIcon } from "@heroicons/react/24/outline";
import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import FreeCounter from "./free-counter";

const montserrat = Montserrat({weight:"600",subsets:['cyrillic-ext']})

const routes = [
    {
      label: 'Dashboard',
      icon: RectangleGroupIcon,
      href: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Conversation',
      icon: ChatBubbleLeftIcon,
      href: '/conversation',
      color: "text-violet-500",
    },
    {
      label: 'Image Generation',
      icon: PhotoIcon,
      color: "text-pink-700",
      href: '/image',
    },
    {
      label: 'Video Generation',
      icon: VideoCameraSlashIcon,
      color: "text-orange-700",
      href: '/video',
    },
    {
      label: 'Music Generation',
      icon: MusicalNoteIcon,
      color: "text-emerald-500",
      href: '/music',
    },
    {
      label: 'Code Generation',
      icon: CodeBracketIcon,
      color: "text-green-700",
      href: '/code',
    },
    {
      label: 'Settings',
      icon: Cog6ToothIcon,
      href: '/settings',
    },
];

interface SidebarProps{
  apiLimitCount:number,
  isPro:boolean
}

const Sidebar = ({apiLimitCount,isPro}:SidebarProps) => {

    const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 h-full flex flex-col bg-[#111827] text-white">
        <div className="px-3 py-2 flex-1">
            <Link href='/dashboard' className="flex items-center pl-3 mb-14">
                <div className="relative w-8 h-8 mr-4">
                    <Image fill src='/logo.png' alt="logo"/>
                </div>
                <h1 className={cn("text-2xl font-bold",montserrat.className)}>Genius</h1>
            </Link>

            <div className="space-y-1">
                {routes.map((route) => (
                    <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-md",pathname === route.href && 'bg-white/10')}>
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3",route.color)}/>
                            {route.label}
                        </div>  
                    </Link>
                ))}
            </div>
        </div>

        {!isPro && (
          <FreeCounter apiLimitCount={apiLimitCount}/>
        )}
    </div>
  )
}

export default Sidebar