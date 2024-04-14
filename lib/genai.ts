import {GoogleGenerativeAI} from '@google/generative-ai'

export const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)