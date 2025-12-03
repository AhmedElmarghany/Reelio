"use client"

import { useLoginMutation, useLogoutMutation, useRegisterMutation } from "@/lib/features/auth/authApi";
import { useState } from "react";
// import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { useOnboardingMutation } from "@/lib/features/user/userApi";
import { useGetAllPostsQuery } from "@/lib/features/posts/postsApi";
import { useLazyGetMovieDetailsQuery, useLazyGetTrendingMoviesQuery, useLazyMovieSearchQuery } from "@/lib/features/tmdb/tmdbApi";

// import { useGetAllPostsQuery } from "@/lib/features/posts/postsApi";


const Home = () => {
  const token: string = Cookies.get("token") as string;
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  // const { isSuccess: CurrentUserIsSuccess, isError: CurrentUserIsError, error: CurrentUserError } = useCurrentUserQuery(token);
  const [register, { isLoading: registerIsLoading, isSuccess: registerIsSuccess, isError: RegisterIsError, error: registerError }] = useRegisterMutation();
  const [logout, { isLoading: logoutIsLoading, isSuccess: logoutIsSuccess, isError: logoutIsError, error: logoutError }] = useLogoutMutation();
  const [onboard, { isLoading: onboardIsLoading, isSuccess: onboardIsSuccess, isError: onboardIsError, error: onboardError }] = useOnboardingMutation();
  const { } = useGetAllPostsQuery(token);
  // console.log("here is data: " + JSON.stringify(posts));

  const [movieId, setMovieId] = useState<number>();
  const [getMovie, { data: movieData, isSuccess: movieIsSuccess, isLoading: movieIsLoading }] = useLazyGetMovieDetailsQuery();

  const [searchQuery, setSearchQuery] = useState<string>();
  const [searchMovie, { data: searchMovieData, isSuccess: searchMovieIsSuccess, isLoading: searchMovieIsLoading }] = useLazyMovieSearchQuery();

  const [trendingMovies, { data: trendingMoviesData, isSuccess: trendingMoviesIsSuccess, isLoading: trendingMoviesIsLoading }] = useLazyGetTrendingMoviesQuery();


  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [regUserInput, setRegUserInput] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {

    e.preventDefault();

    await login({
      email: userInput.email,
      password: userInput.password,
    }).unwrap();
  }

  const handleRegisterSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await register({
      email: regUserInput.email,
      password: regUserInput.password,
    }).unwrap();
    console.log(JSON.stringify(res))
  }
  // const picURL = useSelector((state)=>state.user.pic_url)
  const pic_url = useSelector((state: RootState) => state.user.user_data?.pic_url);

  const handleOnboardingSubmit = async () => {
    const token: string = Cookies.get("token") as string;
    const res = await onboard({
      user_info: {
        name: "Ahmaaaaad noooooo",
        image: "no",
        username: "no",
        bio: "no",
      },
      token: token,
    }).unwrap();
    console.log(JSON.stringify(res))
  }

  const handleLogoutSubmit = async () => {
    try {
      const token: string = Cookies.get("token") as string;
      await logout(token).unwrap(); // will throw on error
      console.log("Logged out");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  const handleGetMovieSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    getMovie((movieId as number));
  }

  const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMovie((searchQuery as string));
  }
  const handleTrendsSubmit = () => {
    trendingMovies();
  }

  return (
    <div className="m-14 text-xl w-80">
      {/* Login */}
      <h3 className="text-white">Login</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <label htmlFor="email" className="text-blue-800">email</label>
        <input type="email" name="email" onChange={(e) => { setUserInput((prev) => { return { ...prev, email: e.target.value } }) }} className="bg-blue-100 border-2 border-blue-500 rounded-sm" />
        <label htmlFor="password" className="text-blue-800">password</label>
        <input type="password" name="password" onChange={(e) => { setUserInput((prev) => { return { ...prev, password: e.target.value } }) }} className="bg-blue-100 border-2 border-blue-500 rounded-sm" />
        <button type="submit" className={`${isLoading ? "bg-blue-600" : "bg-blue-950"} text-blue-100 border-2 border-blue-500 rounded-sm`}>{isLoading ? "wait" : "login"}</button>
      </form>
      {isSuccess && <p className="text-green-500">Success</p>}
      {isError && (<p>{"data" in (error as FetchBaseQueryError) ? JSON.stringify((error as FetchBaseQueryError).data) : "something went wrong"}</p>)}
      {isError && (<p>{"data" in error ? JSON.stringify((error as any).data.message) : "something went wrong"}</p>)}
      {pic_url ? (<a href={pic_url}>img link</a>) : (<p>no link</p>)}

      <br />
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <br />


      {/* Register */}
      <h3 className="text-white">Register</h3>
      <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-1">
        <label htmlFor="email" className="text-blue-800">email</label>
        <input type="email" name="email" onChange={(e) => { setRegUserInput((prev) => { return { ...prev, email: e.target.value } }) }} className="bg-blue-100 border-2 border-blue-500 rounded-sm" />
        <label htmlFor="password" className="text-blue-800">password</label>
        <input type="password" name="password" onChange={(e) => { setRegUserInput((prev) => { return { ...prev, password: e.target.value } }) }} className="bg-blue-100 border-2 border-blue-500 rounded-sm" />
        <button type="submit" className={`${registerIsLoading ? "bg-blue-600" : "bg-blue-950"} text-blue-100 border-2 border-blue-500 rounded-sm`}>{registerIsLoading ? "wait" : "signup"}</button>
      </form>
      {registerIsSuccess && <p className="text-green-500">Success</p>}
      {RegisterIsError && (<p>{"data" in (registerError as FetchBaseQueryError) ? JSON.stringify((registerError as FetchBaseQueryError).data) : "something went wrong"}</p>)}



      <br />
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <br />

      {/* current user */}
      {/* <h3 className="text-white">Get Current User Data</h3>
      {CurrentUserIsSuccess && <p className="text-green-500">Success</p>}
      {CurrentUserIsError && (<p>{"data" in CurrentUserError ? JSON.stringify((CurrentUserError as any).data.error) : "something went wrong"}</p>)} */}

      <br />
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <br />

      {/* onboarding */}
      <h3 className="text-white">Onboarding</h3>
      <button onClick={handleOnboardingSubmit} className={`${onboardIsLoading ? "bg-blue-600" : "bg-blue-950"} w-full text-blue-100 border-2 border-blue-500 rounded-sm`}>{onboardIsLoading ? "wait" : "onboard"}</button>
      {onboardIsSuccess && <p className="text-green-500">Success</p>}
      {onboardIsError && (<p>{"data" in onboardError ? JSON.stringify((onboardError as any).data.error) : "something went wrong"}</p>)}

      <br />
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <br />
      {/* logout */}
      <h3 className="text-white">Logout</h3>
      <button onClick={handleLogoutSubmit} className={`${logoutIsLoading ? "bg-blue-600" : "bg-blue-950"} w-full text-blue-100 border-2 border-blue-500 rounded-sm`}>{logoutIsLoading ? "wait" : "logout"}</button>
      {logoutIsSuccess && <p className="text-green-500">Success</p>}
      {logoutIsError && (<p>{"data" in logoutError ? JSON.stringify((logoutError as any).data.error) : "something went wrong"}</p>)}

      <br />
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <br />

      {/* Get Movie Details*/}

      <h3 className="text-white">Get Movie Details</h3>
      <form onSubmit={handleGetMovieSubmit} className="flex flex-col gap-1">
        <label htmlFor="movieId" className="text-blue-800">Movie id</label>
        <input type="number" name="movieId" onChange={(e) => { setMovieId(Number(e.target.value)) }} className="bg-blue-100 border-2 border-blue-500 rounded-sm" />
        <button type="submit" className={`${movieIsLoading ? "bg-blue-600" : "bg-blue-950"} text-blue-100 border-2 border-blue-500 rounded-sm`}>{movieIsLoading ? "wait" : "Print movie details"}</button>
      </form>
      {movieIsSuccess && <p className="text-zinc-100">{movieData.title}</p>}
      {movieIsSuccess && <p className="text-zinc-600">{movieData.release_date}</p>}
      {movieIsSuccess && <p className="text-zinc-600">{movieData.overview}</p>}


      <br />
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <br />
      {/* Search Movie */}

      <h3 className="text-white">Search</h3>
      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-1">
        <input type="text" name="searchQuery" onChange={(e) => { setSearchQuery(e.target.value) }} className="bg-blue-100 border-2 border-blue-500 rounded-sm" />
        <button type="submit" className={`${searchMovieIsLoading ? "bg-blue-600" : "bg-blue-950"} text-blue-100 border-2 border-blue-500 rounded-sm`}>{searchMovieIsLoading ? "wait" : "search"}</button>
      </form>
      {searchMovieIsSuccess && <p className="text-zinc-100">{searchMovieData.results[0].title}</p>}
      {searchMovieIsSuccess && <p className="text-zinc-500">{searchMovieData.results[0].overview.slice(0, 30)}</p>}
      {searchMovieIsSuccess && <p className="text-zinc-100">{searchMovieData.results[1].title}</p>}
      {searchMovieIsSuccess && <p className="text-zinc-500">{searchMovieData.results[1].overview.slice(0, 30)}</p>}
      {searchMovieIsSuccess && <p className="text-zinc-100">{searchMovieData.results[2].title}</p>}
      {searchMovieIsSuccess && <p className="text-zinc-500">{searchMovieData.results[2].overview.slice(0, 30)}</p>}



      <br />
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <br />
      {/* trend movies */}
      <h3 className="text-white">Trends</h3>
      <button onClick={handleTrendsSubmit} className={`${trendingMoviesIsLoading ? "bg-blue-600" : "bg-blue-950"} w-full text-blue-100 border-2 border-blue-500 rounded-sm`}>{trendingMoviesIsLoading ? "wait" : "get trends"}</button>
      {trendingMoviesIsSuccess && <p className="text-zinc-100">{trendingMoviesData.results[0].title}</p>}
      {trendingMoviesIsSuccess && <p className="text-zinc-500">{trendingMoviesData.results[0].overview}</p>}
      {trendingMoviesIsSuccess && <p className="text-zinc-100">{trendingMoviesData.results[1].title}</p>}
      {trendingMoviesIsSuccess && <p className="text-zinc-500">{trendingMoviesData.results[1].overview}</p>}
      {trendingMoviesIsSuccess && <p className="text-zinc-100">{trendingMoviesData.results[2].title}</p>}
      {trendingMoviesIsSuccess && <p className="text-zinc-500">{trendingMoviesData.results[2].overview}</p>}
      {trendingMoviesIsSuccess && <p className="text-zinc-100">{trendingMoviesData.results[3].title}</p>}
      {trendingMoviesIsSuccess && <p className="text-zinc-500">{trendingMoviesData.results[3].overview}</p>}

    </div>
  )
}

export default Home;