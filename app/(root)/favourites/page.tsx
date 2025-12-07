"use client"
import { useEffect, useState } from "react";
import MovieCard from "@/components/cards/MovieCard";
import { favouritesList } from "@/lib/actions/movie.actions";
import Spinner from "@/components/icons/Spinner";



function Page() {
    const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    // 1. Get list of favourite IDs from your API
    useEffect(() => {
        const fetchFavouriteIds = async () => {
            try {
                const data = await favouritesList();
                // const data = await res.json(); // assume: { ids: number[] }
                setFavouriteIds(data.fav_list);
                // console.log(data.fav_list)
            } catch (error) {
                console.error("Error fetching favourite IDs:", error);
            }
        };

        fetchFavouriteIds();
    }, []);

    // 2. Fetch each movie from TMDB when IDs are ready
    useEffect(() => {
        const fetchMoviesFromTMDB = async () => {
            if (favouriteIds.length === 0) return;

            try {
                const moviesData = await Promise.all(
                    favouriteIds.map(async (id) => {
                        const res = await fetch(
                            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                        );
                        const data = await res.json();
                        return {
                            "id": data.id,
                            "title": data.title,
                            "poster_link": data.poster_path,
                            "year": data.release_date.slice(0, 4),
                            "overview": data.overview,
                            "rate": data.vote_average.toFixed(1)
                        };
                    })
                );
                setMovies(moviesData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movies from TMDB:", error);
            }
        };

        fetchMoviesFromTMDB();
    }, [favouriteIds]);






    return (
        <>
            <div>
                <section>
                    <h1 className="Heading mb-4 mt-6">Your Favourite Movies{!loading && <span className="font-inter text-[18px] text-card-foreground"> ({movies.length})</span>}</h1>
                    {!loading && movies.length == 0 && <h1 className="no-result ">No favourite movies</h1>}

                    {loading ? (
                        <div className="flex items-center justify-center gap-2 w-full my-3 text-center">
                            <Spinner size={18} />
                            <p className=""> Loading...</p>
                        </div>
                    ) : (
                        <>
                            {movies.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
                        </>
                    )}
                </section>

            </div>

        </>
    );
}

export default Page;