import { getTrendingMovies } from "@/lib/actions/movie.actions";
import Image from "next/image";
import Link from "next/link";
import PopularMovieCard from "../cards/popularMovieCard";
import PeopleToFollow from "../cards/PeopleToFollow";
import { fetchRandomUsers } from "@/lib/actions/randomUsers.actions";


async function RightSidebar(){
    const trendingMovies: any= await getTrendingMovies();
    const randomUsers: any = await fetchRandomUsers()
    return (
        <section className="hide-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start border-[1px] border-dark-4 rounded-3xl p-4 gap-y-3 min-w-[360px]">
                <h3 className="text-heading3-bold text-[22px] text-light-1">Popular Now!</h3>
                {trendingMovies.map((movie: any) => {
                    return(
                            <PopularMovieCard movie={movie}/>
                    )
                })}
            </div>
            {/* <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Similar minds!</h3>
            </div> */}
            <div className="flex flex-1 flex-col justify-start border-[1px] border-dark-4 rounded-3xl p-4 gap-y-4">
                <h3 className="text-heading3-bold text-[22px] text-light-1">People to follow!</h3>
                {randomUsers.map((user: any) => {
                    return(
                        <PeopleToFollow
                            userId={user.id}
                            name={user.name}
                            username={user.user_name}
                            image_url={user.pic_url}
                        />
                    )
                })}
            </div>

        </section>
    )
}

export default RightSidebar;
