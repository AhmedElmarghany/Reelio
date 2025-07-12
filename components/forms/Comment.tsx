"use client";

import * as z from "zod"
import Image from "next/image";
import { useForm } from "react-hook-form";
// import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addComment } from "@/lib/actions/review.actions";
// import { useRouter } from 'next/navigation';


// import { CommentValidation } from "@/lib/validations/thread";
// import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  postId: string;
  currentUserImg: string;
  onCommentAdded: any;
//   currentUserId: string;
}
const FormSchema = z.object({
    text: z.string().nonempty().min(1, {message: "Must be at least 1 characters"}).max(280, {message: "Max 280 characters"}),
    })



function Comment({ postId, currentUserImg, onCommentAdded }: Props) {
  // const pathname = usePathname();
  // const router = useRouter();


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const commentData = await addComment(
      postId,
      values.text,
    );

    // what does that do?
    form.reset();
    onCommentAdded(commentData.comment_data); // ← بعد ما ترجع من PHP
  };

  return (
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='current_user'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
          Add
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
