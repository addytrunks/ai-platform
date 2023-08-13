import { replicate } from "@/lib/replicate";
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

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt
        }
      }
    );

    return NextResponse.json(response)
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
