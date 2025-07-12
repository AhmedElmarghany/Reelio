"use client"
import { useEffect, useState } from "react";
import MovieCard from "@/components/cards/MovieCard";
import { Loader2 } from "lucide-react";
import { favouritesList } from "@/lib/actions/movie.actions";



function Page() {
    const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    // 1. Get list of favourite IDs from your API
    useEffect(() => {
        const fetchFavouriteIds = async () => {
            try {
                const data = await favouritesList(); // API بتاعك
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
                        let data: any = await res.json();
                        return {
                            "id": data.id,
                            "title": data.title,
                            "poster_link": `https://image.tmdb.org/t/p/w1280${data.poster_path}`,
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
                    <h1 className="text-heading3-bold text-light-1 mb-4">Your Favourite Movies{!loading && <span className="font-inter text-neutral-500 font-semibold text-[24px]">({movies.length})</span>}</h1>
                    {!loading && movies.length == 0 && <h1 className="no-result ">No favourite movies</h1>}

                    {loading ? (
                        <div className="text-center mt-10 text-primary">
                            <Loader2 className="animate-spin inline mr-2" />
                            Loading your movies...
                        </div>    
                    ) : (
                        <>
                            {movies.map((movie) => (<MovieCard movie={movie} />))}
                        </>
                    )}
                </section>

            </div>

        </>
    );
    }

export default Page;