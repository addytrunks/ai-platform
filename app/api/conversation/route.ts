import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { openai } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { messages } = body;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!openai)
      return new NextResponse("No Open AI API key configured", { status: 500 });

    if (!messages)
      return new NextResponse("Messages are required", { status: 400 });

    const freeTrial = await checkApiLimit();

    if (freeTrial === false)
      return new NextResponse("Free trial has expired", { status: 403 });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    await increaseApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSTATION_ERROR]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
