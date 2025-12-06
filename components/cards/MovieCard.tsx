'use client'

import Link from "next/link";
import MoviePoster from "./MoviePoster";

const MovieCard = (props: any) => {
    return (
    <Link className="flex mt-6 bg-primary-foreground p-3 rounded-[0.625rem] border border-border-dark " href={`/movie/${props.movie.id}`}>

            <div className="mr-2">
                <MoviePoster poster_path={props.movie.poster_link} size="large"/>
            </div>
            <div className="flex flex-col ml-2 content-end">
                <h1 className="movie_title text-[30px]">{props.movie.title}<span className="font-inter text-card-foreground text-[18px]">&nbsp; {props.movie.year}</span></h1>

                <h2 className="mb-2 text-card-foreground font-inter text-[20px]">Average rating: <span className="text-foreground font-inter">&#40; <span className="text-primary text-[30px] font-semibold">{props.movie.rate}</span> / 10 &#41;</span></h2>

                <p className="mb-1 font-inter text-foreground font-normal line-clamp-3">{props.movie.overview}</p>
            </div>
        </Link>
    )
}

export default MovieCard;