"use client";

import Heading from "@/components/heading";
import { MusicalNoteIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from 'axios'
import { Empty } from "@/components/ui/empty";
import {Loader} from "@/components/ui/loader";
import { useProModal } from "@/hooks/use-pro-modal";

const VideoPage = () => {

  const {onOpen} = useProModal()
  const router = useRouter()
  const [video,setVideo] = useState<string|undefined>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined)
      const res = await axios.post('/api/video',values);
      setVideo(res.data[0])
      form.reset()
    } catch (error:any) {
      if(error?.response?.status === 403) onOpen();
    }finally{
      router.refresh()
    }
  };

  return (
    <div>
      <Heading
        title="Video"
        description="Turn your prompt into a video"
        icon={VideoCameraIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Clown fish swimming around coral reefs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>Generate</Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader/>
            </div>
          )}
          {!video && !isLoading && (
            <Empty label="No video generated"/>
          )}
          {video && (
            <video className="w-full aspect-video mt-8 rounde border bg-black" controls>
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
