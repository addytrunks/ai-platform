import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { replicate } from "@/lib/replicate";
import { checkSubscriptions } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { prompt } = body;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!replicate)
      return new NextResponse("No Replicate API key configured", {
        status: 500,
      });

    if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscriptions();

    if (freeTrial === false && !isPro)
      return new NextResponse("Free trial has expired", { status: 403 });

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    if(!isPro){
      await increaseApiLimit();
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
