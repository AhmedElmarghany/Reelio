"use client"
// import { getTrendingMovies } from "@/lib/actions/movie.actions";
import Link from "next/link";
import PopularMovieCard from "../cards/PopularMovieCard";
// import PeopleToFollow from "../cards/PeopleToFollow";
// import { fetchRandomUsers } from "@/lib/actions/randomUsers.actions";
import SearchIcon from "../icons/SearchIcon";
import { useGetTrendingMoviesQuery } from "@/lib/features/tmdb/tmdbApi";
import { useGetRandomUsersQuery } from "@/lib/features/user/userApi";
import PeopleToFollow from "../cards/PeopleToFollow";


function RightSidebar() {
    // const trendingMovies: any = await getTrendingMovies();
    // const [trendingMovies, { data: trendingMoviesData, isSuccess: trendingMoviesIsSuccess, isLoading: trendingMoviesIsLoading }] = useLazyGetTrendingMoviesQuery();
    const { data: trendingMovies } = useGetTrendingMoviesQuery();
    const { data: randomUsers } = useGetRandomUsersQuery();
    // console.log("here is random users: ")
    // console.log(randomUsers);
    // console.log(trendingMovies);
    // const randomUsers: any = await fetchRandomUsers()
    return (
        <section className="hide-scrollbar rightsidebar">
            <div>
                <Link href="/search" key="search" className="flex flex-1 justify-start items-center border border-border-dark rounded-full px-4 py-3 gap-2 min-w-[360px] cursor-pointer">
                    <SearchIcon color="#71767B" stroke="#71767B" size={18} strokeWidth={1.5} />
                    <p className="font-inter text-[14px] text-card-foreground pointer-events-none">Search</p>
                </Link>
            </div>
            <div className="flex flex-1 flex-col justify-start border border-border-dark rounded-3xl p-4 gap-y-3 min-w-[360px]">
                <h3 className="Heading">Popular Now!</h3>
                {trendingMovies && trendingMovies.results.slice(0, 3).map((movie) => {
                    return (
                        <PopularMovieCard movie={movie} key={movie.id}/>
                    )
                })}
            </div>
            <div className="flex flex-1 flex-col justify-start border border-border-dark rounded-3xl p-4">
                <h3 className="Heading">People to follow!</h3>
                {randomUsers && randomUsers.data.map((user) => {
                    return (
                        <PeopleToFollow
                            userId={user.id}
                            name={user.name}
                            username={user.user_name}
                            image_url={user.pic_url}
                            key={user.id}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default RightSidebar;
