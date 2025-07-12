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
import SearchBar from "../ui/searchBar"
import SelectedMovie from "../ui/selectedMovie"
import { useState } from "react"
import { ReviewValidation } from "@/lib/validations/review";
import { usePathname, useRouter } from "next/navigation"
import { createReview } from "@/lib/actions/review.actions"

// {
//     "movie_id": "113542", 
//     "text": "cdasd", 
//     "year": "2000",
//     "posterLink": "https://image.tmdb.org/t/p/w500/fmsvlknfnvse.jpg",
//     "title": "sacdfca",
//     "rate": 5
// }

const FormSchema = z.object({
    review: z.string().nonempty().min(3, {message: "Must be at least 3 characters"}).max(280, {message: "Max 280 characters"}),
    rate: z.number().min(1, {message: "You must choose a rate score 1:5"}).max(5),
    movieId: z.number().positive({message: "You must select a movie"}),
    title: z.string(),
    posterLink: z.string(),
    year: z.string(),
})


export function PostReview() {
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            movieId: 0,
            review: "",
            rate: 0,
        },
    })
    



    const handleMovieSelect = (movie: any) => {
        setSelectedMovie(movie);
        form.setValue("movieId", movie.id); // this sets the value in the form
        form.setValue("title", movie.title); 
        form.setValue("year", movie.year); 
        form.setValue("posterLink", movie.poster_link);
    };


    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        await createReview({
            text: values.review,
            rate: values.rate,
            movieId: values.movieId,
            year: values.year,
            title: values.title,
            posterLink: values.posterLink,
            path: pathname
        })

        router.push("/")
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-start gap-10"
                >

                    <FormField
                        control={form.control}
                        name="movieId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-base-semibold text-light-2'>Movie</FormLabel>
                                <FormControl>
                                    <div>
                                        <SearchBar setSelectedMovie={handleMovieSelect} />
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
                                <FormLabel className='text-base-semibold text-light-2'>
                                    Review
                                </FormLabel>
                                <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
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
                                <FormLabel className='text-base-semibold text-light-2'>Rating</FormLabel>
                                <FormControl>
                                    <div>
                                        <RatingStar
                                            iconColor='#01BD82'
                                            backgroundColor='#dfe6e9'
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


                    <Button type="submit" className="bg-primary">
                        Post
                    </Button>



                </form>
            </Form>


        </>
    )
}


export default PostReview;



// ===============================================
// الكود القديم
// ===============================================

// "use client"

// import * as z from "zod"
// import { useForm } from "react-hook-form"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Textarea } from "../ui/textarea"
// import { zodResolver } from '@hookform/resolvers/zod'

// import { RatingStar } from 'react-ts-rating-star'
// import SearchBar from "../ui/searchBar"
// import SelectedMovie from "../ui/selectedMovie"
// import { useState } from "react"
// import { ReviewValidation } from "@/lib/validations/review";
// import { usePathname, useRouter } from "next/navigation"
// import { createReview } from "@/lib/actions/review.actions"





// export function PostReview({ userId }: { userId: string }) {
//     const [selectedMovie, setSelectedMovie] = useState<any>(null);
//     const router = useRouter();
//     const pathname = usePathname();

//     const form = useForm<z.infer<typeof ReviewValidation>>({
//         resolver: zodResolver(ReviewValidation),
//         defaultValues: {
//             movieId: 0,
//             review: "",
//             rate: 0,
//             accountId: userId,
//         },
//     })
    



//     const handleMovieSelect = (movie: any) => {
//         setSelectedMovie(movie);
//         form.setValue("movieId", movie.id); // this sets the value in the form
//         form.setValue("movieInfo", {
//             title: movie.title,
//             posterLink: movie.poster_link,
//             year: movie.year
//         }); // this sets the value in the form
//     };


//     const onSubmit = async(values: z.infer<typeof ReviewValidation>) =>{
//         await createReview({
//             text: values.review,
//             author: userId, 
//             communityId: null,
//             rate: values.rate,
//             movieId: values.movieId,
//             movieInfo: values.movieInfo,
//             path: pathname
//         })

//         router.push("/")
//     }

//     return (
//         <>
//             <Form {...form}>
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="mt-6 flex flex-col justify-start gap-10"
//                 >

//                     <FormField
//                         control={form.control}
//                         name="movieId"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className='text-base-semibold text-light-2'>Movie</FormLabel>
//                                 <FormControl>
//                                     <div>
//                                         <SearchBar setSelectedMovie={handleMovieSelect} />
//                                     </div>
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     {selectedMovie && <SelectedMovie selectedMovie={selectedMovie} />}

//                     <FormField
//                         control={form.control}
//                         name='review'
//                         render={({ field }) => (
//                             <FormItem className='flex w-full flex-col gap-3'>
//                                 <FormLabel className='text-base-semibold text-light-2'>
//                                     Review
//                                 </FormLabel>
//                                 <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
//                                     <Textarea rows={3} {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />



//                     <FormField
//                         control={form.control}
//                         name="rate"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className='text-base-semibold text-light-2'>Rating</FormLabel>
//                                 <FormControl>
//                                     <div>
//                                         <RatingStar
//                                             iconColor='#01BD82'
//                                             backgroundColor='#dfe6e9'
//                                             iconWidth='2.5em'
//                                             iconHeight='2.5em'
//                                             averageRating={0}
//                                             iconHoverEffect='scaling'
//                                             onClick={field.onChange}
//                                         />
//                                     </div>
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />


//                     <Button type="submit" className="bg-primary">
//                         Post
//                     </Button>



//                 </form>
//             </Form>


//         </>
//     )
// }


// export default PostReview;

