import * as z from 'zod';

export const ReviewValidation = z.object({
    review: z.string().nonempty().min(3, {message: "Must be at least 3 characters"}).max(120, {message: "Max 120 characters"}),
    rate: z.number().min(1, {message: "You must choose a rate score 1:5"}).max(5),
    movieId: z.number().positive({message: "You must select a movie"}),
    movieInfo: z.object({title: z.string(),
                        posterLink: z.string(),
                        year: z.string()
    }),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    comment: z.string().nonempty().min(3, {message: "Minimum 3 characters"}),
})


// ===============================================
// الكود لحد هنا شغال
// ===============================================

// import * as z from 'zod';

// export const ReviewValidation = z.object({
//     review: z.string().nonempty().min(3, {message: "Must be at least 3 characters"}).max(120, {message: "Max 120 characters"}),
//     rate: z.number().min(1, {message: "You must choose a rate score 1:5"}).max(5),
//     movieId: z.number().positive({message: "You must select a movie"}),
//     accountId: z.string(),
// })

// export const CommentValidation = z.object({
//     comment: z.string().nonempty().min(3, {message: "Minimum 3 characters"}),
// })