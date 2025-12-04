'use client'

import Link from "next/link";
import MoviePoster from "./MoviePoster";
import { genres as allGenres } from "@/constants/genres";


const PopularMovieCard = ({ movie }) => {
    const genreMap = Object.fromEntries(allGenres.map(g => [g.id, g.name]));

    return (
        <Link href={`/movie/${movie.id}`} className="flex hover:bg-card-hover rounded-xl p-1">
            <MoviePoster poster_path={movie.poster_path} size="small" />
            <div className="flex flex-col ml-2 content-end ">
                <h1 className="movie_title text-[18px]">{movie.original_title}</h1>
                <p className="text-card-foreground font-medium font-inter text-[14px]">{movie.genre_ids.map((id: number) => genreMap[id]).slice(0, 3).join(" / ")}</p>
                <p className="text-card-foreground font-medium font-inter text-[14px]">{movie.release_date.slice(0,4)}</p>
                <p className="text-card-foreground font-medium font-inter text-[14px]">{movie.vote_average.toFixed(1)} / 10</p>
            </div>
        </Link>
    )
}
export default PopularMovieCard;