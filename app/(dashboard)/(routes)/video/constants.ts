import { z } from "zod";

export const formSchema = z.object({
    prompt:z.string().min(5,{
        message:'Video prompt must alteast contain 5 character(s)'
    })
})