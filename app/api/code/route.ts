import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { openai } from "@/lib/openai";
import { checkSubscriptions } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage } from "openai";

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator.You must answer only markdown code snippets. Use code comments for explanation",
};

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
    const isPro = await checkSubscriptions();

    if (freeTrial === false && !isPro)
      return new NextResponse("Free trial has expired", { status: 403 });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    if(!isPro){
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
