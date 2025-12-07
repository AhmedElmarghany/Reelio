"use client";

import * as z from "zod"
import { useForm } from "react-hook-form";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CommentValidation } from "@/lib/validations/review";
import { useAddCommentMutation } from "@/lib/features/posts/postsApi";

interface Props {
  postId: string;
  currentUserImg: string;
  onCommentAdded: any;
}


function Comment({ postId, currentUserImg, onCommentAdded }: Props) {
  const [addComment] = useAddCommentMutation();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    try{
      const commentData = await addComment({
          post_id: postId,
          text: values.text,
        }).unwrap();
        form.reset();
        onCommentAdded(commentData.comment_data);
    }catch (err){
      console.log(err);
    }
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
                <Avatar className="h-12 w-12 rounded-full">
                  <AvatarImage src={currentUserImg} alt="User Image" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  autoComplete="off"
                  className='no-focus text-foreground outline-none'
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
