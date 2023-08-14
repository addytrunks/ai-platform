import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ArrowRightIcon, ChatBubbleLeftIcon, CodeBracketIcon, MusicalNoteIcon, PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MAX_FREE_COUNTS = 5

export const tools = [
  {
    label: 'Conversation',
    icon: ChatBubbleLeftIcon,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Music Generation',
    icon: MusicalNoteIcon,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Image Generation',
    icon: PhotoIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoCameraIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: CodeBracketIcon,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
];

export const absoulteUrl = (path:string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}