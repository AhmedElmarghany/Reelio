"use client"

// import { useCurrentUserQuery, useLazyCurrentUserQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } from "@/lib/features/auth/authApi";
import { useCurrentUserQuery } from "@/lib/features/auth/authApi";
// import { useEffect, useState } from "react";
// import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
// import { useFollowUnfollowMutation, useOnboardingMutation } from "@/lib/features/user/userApi";
// import { useGetAllPostsQuery } from "@/lib/features/posts/postsApi";
// import { useLazyGetMovieDetailsQuery, useLazyGetTrendingMoviesQuery, useLazyMovieSearchQuery } from "@/lib/features/tmdb/tmdbApi";
// import { useRouter } from "next/navigation";

// import { useGetAllPostsQuery } from "@/lib/features/posts/postsApi";


const Home = () => {
  const token: string = Cookies.get("token") as string;
  // const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  // const { isSuccess: CurrentUserIsSuccess, isError: CurrentUserIsError, error: CurrentUserError } = useCurrentUserQuery(token);
  // const { isSuccess: CurrentUserIsSuccess, isError: CurrentUserIsError, error: CurrentUserError } = useCurrentUserQuery(token);
  // const [register, { isLoading: registerIsLoading, isSuccess: registerIsSuccess, isError: RegisterIsError, error: registerError }] = useRegisterMutation();
  // const [logout, { isLoading: logoutIsLoading, isSuccess: logoutIsSuccess, isError: logoutIsError, error: logoutError }] = useLogoutMutation();
  // const [onboard, { isLoading: onboardIsLoading, isSuccess: onboardIsSuccess, isError: onboardIsError, error: onboardError }] = useOnboardingMutation();
  // const [followUnfollow, { isLoading: followLoading, isSuccess: followSuccess, isError: followIsError, error: followError }] = useFollowUnfollowMutation();
  // const { } = useGetAllPostsQuery(token);
  // console.log("here is data: " + JSON.stringify(posts));

  // const [movieId, setMovieId] = useState<number>();
  // const [getMovie, { data: movieData, isSuccess: movieIsSuccess, isLoading: movieIsLoading }] = useLazyGetMovieDetailsQuery();

  // const [searchQuery, setSearchQuery] = useState<string>();
  // const [searchMovie, { data: searchMovieData, isSuccess: searchMovieIsSuccess, isLoading: searchMovieIsLoading }] = useLazyMovieSearchQuery();

  // const [trendingMovies, { data: trendingMoviesData, isSuccess: trendingMoviesIsSuccess, isLoading: trendingMoviesIsLoading }] = useLazyGetTrendingMoviesQuery();


  // const [userInput, setUserInput] = useState({ email: "", password: "" });
  // const [regUserInput, setRegUserInput] = useState({ email: "", password: "" });

  // Current User
  // const [currentser, { data: currentUserData, isSuccess: currentUserIsSuccess, isLoading: currentUserIsLoading }] = useLazyCurrentUserQuery();
  // const [currentuser] = useLazyCurrentUserQuery();
  const currentUserDataRedux = useSelector((state: RootState) => state.user.user_data)
  // const [checkingAuth, setCheckingAuth] = useState(true);

    const { isLoading } = useCurrentUserQuery(token!, {
    skip: currentUserDataRedux !== null, // Skip query if no token
  });

  if(isLoading) return null;




  // const handleOnboardingSubmit = async () => {
  //   const token: string = Cookies.get("token") as string;
  //   const res = await onboard({
  //     user_info: {
  //       name: "Ahmaaaaad noooooo",
  //       image: "no",
  //       username: "no",
  //       bio: "no",
  //     },
  //     token: token,
  //   }).unwrap();
  //   console.log(JSON.stringify(res))
  // }


  // const handleGetMovieSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   getMovie((movieId as number));
  // }

  // const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   searchMovie((searchQuery as string));
  // }

  return (
    <div className="Heading m-14 text-xl w-80">
      Hello
    </div>
  )
}

export default Home;