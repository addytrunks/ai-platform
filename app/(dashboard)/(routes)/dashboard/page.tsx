"use client"

import { Card } from "@/components/ui/card";
import { cn, tools } from "@/lib/utils";
import { ArrowRightIcon, ChatBubbleLeftIcon, CodeBracketIcon, MusicalNoteIcon, PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Chat with the smartest - Experience the power of AI</p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card key={tool.href} onClick={() => router.push(tool.href)} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRightIcon className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </>
  )
}
