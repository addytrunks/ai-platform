import { openai } from "@/lib/openai";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export const POST = async(req:Request) => {
    try {   
        const body = await req.json()
        const {prompt,amount=1,resolution="512x512"} = body;
        const {userId} = auth();

        if(!userId)return  new NextResponse('Unauthorized',{status:401});

        if(!openai) return new NextResponse('No Open AI API key configured',{status:500});

        if(!prompt) return new NextResponse('Prompt is required',{status:400});
        if(!amount) return new NextResponse('Amount is required',{status:400});
        if(!resolution) return new NextResponse('Resolution is required',{status:400});


        const response = await openai.createImage({
           prompt,
           n:parseInt(amount,10),
           size:resolution
        })
        return NextResponse.json(response.data.data)
    } catch (error) {
        console.log('[IMAGE_ERROR]',error)
        return NextResponse.json('Internal Server Error',{status:500})
    }
}