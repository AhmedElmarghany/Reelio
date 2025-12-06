"use server"
import { cookies } from "next/headers";

export async function getMovieById(movieId: any) {
  try {

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      {next: { revalidate: 60 }},
    );

    if (!response.ok) throw new Error("Failed to fetch movie");

    const data = await response.json();
    return data;
    
        
  } catch (error: any) {
    throw new Error(`Failed: ${error.message}`);
  }
}

import { genres as allGenres } from "@/constants/genres";


export async function getTrendingMovies(): Promise<any> {
    const genreMap = Object.fromEntries(allGenres.map(g => [g.id, g.name]));

  try {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    
    const res = await fetch(url, {
      next: { revalidate: 600 }, // Optional: cache for 60s
    });

    // const res = await fetch(url);
    const data = await res.json();

    const movieOptions = data.results.slice(0, 3).map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date.slice(0,4),
      rate: movie.vote_average.toFixed(1),
      poster_link: movie.poster_path,
      genres: movie.genre_ids.map((id: number) => genreMap[id]).slice(0, 3).join(" / "),
    }));

    return movieOptions;
  } catch (err) {
    console.error("Error fetching trending movies:", err);
    return []; 
  }
}
interface checkFavRes {
    success: boolean,
    is_fav: boolean
}
export async function checkFav(movieId: string): Promise<checkFavRes>{
  
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

      const response = await fetch(
        `http://localhost/Relioo/api/posts/checkFav.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movie_id: movieId
          }),
        }
      );
      
      if (!response.ok){
        throw new Error("Failed to check favorite status");
      }
      return await response.json();
      
    }
interface addAndDelFavRes {
  success: boolean,
  is_fav: boolean,
  message: string
}
export async function addAndDelFavourites(movieId: string): Promise<addAndDelFavRes>{


      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await fetch(
        `http://localhost/Relioo/api/posts/addAndDelFav.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movie_id: movieId
          }),
        }
      );

      if (!response.ok){
        throw new Error("Failed to to add or remove from favorite");
      }
      return await response.json();
}
export async function favouritesList(){


      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await fetch(
        `http://localhost/Relioo/api/posts/favList.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (!response.ok){
        throw new Error("Failed to fetch favorites");
      }
      return await response.json();
}
