'use client'

import MoviePoster from "../cards/MoviePoster";

const SelectedMovie = ({ selectedMovie }: { selectedMovie: any }) => {
    return (
        <div className="flex mt-6">
            <MoviePoster poster_path={selectedMovie.poster_link} size="large"/>
            <div className="flex flex-col ml-2 content-end">
                <h1 className="movie_title mb-2 text-[36px]">{selectedMovie.title}<span className="text-card-foreground text-[28px]">&nbsp;. {selectedMovie.year}</span></h1>
                <h2 className="font-inter mb-2 text-card-foreground font-medium text-[20px]">Average rating: &#40;{selectedMovie.rate} / 10&#41;</h2>
                <h2 className="font-inter text-card-foreground font-medium line-clamp-3">{selectedMovie.overview}</h2>
            </div>
        </div>
    )
}

export default SelectedMovie;