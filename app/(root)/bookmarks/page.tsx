"use client"
import { useEffect, useState } from "react";
import ReviewCard from "@/components/cards/ReviewCard";
import { Loader2 } from "lucide-react";
import { fetchBookmarks } from "@/lib/actions/review.actions";



function Page() {
    // const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    // 1. Get list of favourite IDs from your API
    useEffect(() => {
        const fetchBookmarkedPosts = async () => {
            try {
                const data = await fetchBookmarks(); // API بتاعك
                // const data = await res.json(); // assume: { ids: number[] }
                setPosts(data.postsList);
                setLoading(false);
                // console.log(data.fav_list)
            } catch (error) {
                console.error("Error fetching Bokkmarked posts:", error);
            }
        };

        fetchBookmarkedPosts();
    }, []);





    return (
        <>
            <div>
                <section>
                    <h1 className="text-heading3-bold text-light-1 mb-4">Your Bookmarked Posts {!loading && <span className="font-inter text-neutral-500 font-semibold text-[24px]">({posts.length})</span>}</h1>
                    {!loading && posts.length == 0 && <p className="no-result">There are no bookmarked posts yet.</p>}

                    {loading ? (
                        <div className="text-center mt-10 text-primary">
                            <Loader2 className="animate-spin inline mr-2" />
                            Loading your bookmarked posts...
                        </div>    
                    ) : (
                        <>
                            {posts.map((post) => (
                                <div className="my-3">
                                    <ReviewCard
                                        key={post.post.post_data.post_id}
                                        id={post.post.post_data.post_id}
                                        currentUserId={post.post.post_data.user_id}
                                        content={post.post.post_data.text}
                                        author={post.post.post_data.user_id}
                                        createdAt={post.post.post_data.date_time}
                                        is_liked={post.post.is_liked}
                                        is_Bookmarked={post.post.is_bookmarked}
                                        // comments={post.post.post_data.comments}
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
                    )}
                </section>

            </div>

        </>
    );
    }

export default Page;