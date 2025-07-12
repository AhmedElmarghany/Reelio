'use client'

import Image from "next/image";
import Link from "next/link";

export default function ({ movie }: { movie: any }) {
    return (
        <Link href={`/movie/${movie.id}`} className="flex hover:bg-dark-3 rounded-xl p-1">
            {movie.poster_link.slice(-4) != "null" ? (<Image src={movie.poster_link} width={60} height={90} alt={movie.title} className="mr-2 rounded-lg" />) : (<Image src={`/assets/no-img.svg`} width={60} height={90} alt="No poster Found for this movie" className="mr-2 rounded-lg border-[7px] border-neutral-800" />)}
            <div className="flex flex-col ml-2 content-end ">
                <h1 className="text-neutral-100 font-lora text-[18px]">{movie.title}</h1>
                <h2 className="text-neutral-600 font-semibold font-inter text-[14px]">{movie.genres}</h2>
                <h2 className="text-neutral-600 font-semibold font-inter text-[14px]">{movie.year}</h2>
                <h2 className="text-neutral-600 font-semibold font-inter text-[14px]">{movie.rate} / 10</h2>
            </div>
        </Link>
    )
}