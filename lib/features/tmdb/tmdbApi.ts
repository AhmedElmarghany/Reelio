import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN;

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


interface MovieSummary {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieSearchResult {
  page: number;
  results: MovieSummary[];
  total_pages: number;
  total_results: number;
}


interface TrendingMovie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string; // typically "movie"
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingMoviesResponse {
  page: number;
  results: TrendingMovie[];
  total_pages: number;
  total_results: number;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: TMDB_BASE_URL,
    prepareHeaders:
    (headers) => {
        headers.set("Authorization", `Bearer ${TMDB_TOKEN}`);
      return headers;
    },
   }),
  keepUnusedDataFor: 60, // cache for 1 minute
  endpoints: (builder) => ({
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (movie_id) => ({
        url: `${TMDB_BASE_URL}/movie/${movie_id}`
      }),
    }),
    movieSearch: builder.query<MovieSearchResult, string>({
      query: (query) => ({
        url: `${TMDB_BASE_URL}/search/movie?query=${query}`
      }),
    }),
    getTrendingMovies: builder.query<TrendingMoviesResponse, void>({
      query: () => ({
        url: `${TMDB_BASE_URL}/trending/movie/day`
      }),
    }),
  }),
});

export const { useGetMovieDetailsQuery, useLazyGetMovieDetailsQuery, useLazyMovieSearchQuery, useLazyGetTrendingMoviesQuery } = tmdbApi;
