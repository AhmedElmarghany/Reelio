'use client'

import Image from "next/image";

export default function ({ selectedMovie }: { selectedMovie: any }) {
    return (
        <div className="flex mt-6">
            {selectedMovie.poster_link.slice(-4) != "null" ? (<Image src={selectedMovie.poster_link} width={120} height={180} alt={selectedMovie.title} className="mr-2 rounded-xl" />) : (<Image src={`/assets/no-img.svg`} width={120} height={180} alt="No poster Found for this movie" className="mr-2 rounded-xl border-[7px] border-neutral-800" />)}
            <div className="flex flex-col ml-2 content-end">
                <h1 className="mb-2 text-neutral-100 font-lora text-[36px]">{selectedMovie.title}<span className="text-neutral-600 text-[28px]">&nbsp;. {selectedMovie.year}</span></h1>
                <h2 className="mb-2 text-neutral-600 font-medium text-[20px]">Average rating: &#40;{selectedMovie.rate} / 10&#41;</h2>
                <h2 className="text-neutral-600 font-medium line-clamp-3">{selectedMovie.overview}</h2>
            </div>
        </div>
    )
}