import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { genai } from "@/lib/genai";
import { checkSubscriptions } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { messages, prompt } = body;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!messages)
      return new NextResponse("Messages are required", { status: 400 });

    if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscriptions();

    if (freeTrial === false && !isPro)
      return new NextResponse("Free trial has expired", { status: 403 });

    const model = genai.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({ history: messages });
    const result = await chat.sendMessage("I want you to render in markdown format for the below prompt"+prompt);
    const response = result.response
    const text = response.text()

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(text, { status: 200 });
  } catch (error) {
    console.log("[CONVERSTATION_ERROR]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
