"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod'

import { RatingStar } from 'react-ts-rating-star'
import SelectedMovie from "@/components/ui/SelectedMovie"
import { useState } from "react"
import { ReviewValidation } from "@/lib/validations/review";
import { usePathname, useRouter } from "next/navigation"
// import { createReview } from "@/lib/actions/review.actions"
import Search from "../ui/Search"
import { useCreatePostMutation } from "@/lib/features/posts/postsApi"
import Spinner from "../icons/Spinner"


export function PostReview() {
    const [createPost, {isLoading}] = useCreatePostMutation();
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof ReviewValidation>>({
        resolver: zodResolver(ReviewValidation),
        defaultValues: {
            movieId: 0,
            review: "",
            rate: 0,
        },
    })
    



    const handleMovieSelect = (movie: any) => {
        setSelectedMovie(movie);
        form.setValue("movieId", movie.id);
        form.setValue("title", movie.title); 
        form.setValue("year", movie.year); 
        form.setValue("posterLink", movie.poster_link);
    };


    const onSubmit = async (values: z.infer<typeof ReviewValidation>) => {
        // await createReview({
        //     text: values.review,
        //     rate: values.rate,
        //     movieId: values.movieId,
        //     year: values.year,
        //     title: values.title,
        //     posterLink: values.posterLink,
        //     path: pathname
        // })

        const res = await createPost({
          movie_id: values.movieId,
          text: values.review,
          year: values.year,
          poster_link: values.posterLink,
          movie_title: values.title,
          rate: values.rate,
        })
        console.log(res);

        router.push("/")
    }

    return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-start gap-10 mt-6"
                >

                    <FormField
                        control={form.control}
                        name="movieId"
                        render={() => (
                            <FormItem>
                                <FormLabel className='text-[16px] font-semibold text-card-foreground'>Movie</FormLabel>
                                <FormControl>
                                    <div>
                                        <Search setSelectedMovie={handleMovieSelect}/>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {selectedMovie && <SelectedMovie selectedMovie={selectedMovie} />}

                    <FormField
                        control={form.control}
                        name='review'
                        render={({ field }) => (
                            <FormItem className='flex w-full flex-col gap-3'>
                                <FormLabel className='text-[16px] font-semibold text-card-foreground'>
                                    Review
                                </FormLabel>
                                <FormControl className='no-focus border border-border-dark bg-card text-foreground rounded-xl'>
                                    <Textarea rows={3} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[16px] font-semibold text-card-foreground'>Rating</FormLabel>
                                <FormControl>
                                    <div>
                                        <RatingStar
                                            iconColor='#01BD82'
                                            backgroundColor='#A3A3A3'
                                            iconWidth='2.5em'
                                            iconHeight='2.5em'
                                            averageRating={0}
                                            iconHoverEffect='scaling'
                                            onClick={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <Button type="submit" className="bg-primary text-card font-semibold text-[18px] rounded-xl" disabled={isLoading}>
                        {isLoading}
                    </Button> */}
                    <Button type="submit" className="bg-primary text-primary-foreground font-medium cursor-pointer" disabled={isLoading}>{isLoading ? <><Spinner size={12} /> Posting...</> : "Post"}</Button>

                </form>
            </Form>
    )
}


export default PostReview;