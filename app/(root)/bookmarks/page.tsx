"use client"

import ReviewCard from "@/components/cards/ReviewCard";
import { useGetBookmarksQuery } from "@/lib/features/posts/postsApi";
import Spinner from "@/components/icons/Spinner";

function Page() {
    const {data, isLoading} = useGetBookmarksQuery();

    return (
        <>
            <div>
                <section>
                    <h1 className="Heading mb-4 mt-6">Your Bookmarked Posts {!isLoading && <span className="font-inter text-[18px] text-card-foreground">({data.postsList.length})</span>}</h1>
                    {isLoading &&
                        <div className="flex items-center justify-center gap-2 w-full my-3 text-center">
                            <Spinner size={18} />
                            <p> Loading...</p>
                        </div>
                    }
                    {!isLoading && data.postsList.length == 0 && <p className="no-result">You have no bookmarked posts.</p>}

                    {data &&
                        <>
                            {data.postsList.map((post) => (
                                <div className="my-3" key={post.post_id}>
                                    <ReviewCard
                                        key={post.post.post_data.post_id}
                                        id={post.post.post_data.post_id}
                                        currentUserId={post.post.post_data.user_id}
                                        content={post.post.post_data.text}
                                        author={post.post.post_data.user_id}
                                        createdAt={post.post.post_data.date_time}
                                        is_liked={post.post.is_liked}
                                        is_Bookmarked={post.post.is_bookmarked}
                                        movieId={post.post.post_data.movie_id}
                                        username={post.post.post_data.user_name}
                                        name={post.post.post_data.name}
                                        pic_url={post.post.post_data.pic_url}
                                        rate={post.post.post_data.rate}
                                        year={post.post.movie_data[0].year}
                                        title={post.post.movie_data[0].title}
                                        posterLink={post.post.movie_data[0].posterLink}
                                    />
                                </div>
                            ))}
                        </>
                    }
                </section>

            </div>

        </>
    );
}

export default Page;