"use client"

import Follower from "@/components/cards/Follower";
import ReviewCard from "@/components/cards/ReviewCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchProfile } from "@/lib/actions/profile.actions";


function Page({params}: {params: {id: string}}){

        const [userData, setUserData] = useState<any>(null);
        const [loading, setLoading] = useState(true);
        
    
        useEffect(() => {
            const getProfileData = async () => {
                try {
                    const data = await fetchProfile(params.id);
                    setUserData(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            };
    
            getProfileData();
        }, []);
    
    
    return (
        <>
            {loading && (
                <div className="text-center mt-10 text-primary">
                    <Loader2 className="animate-spin inline mr-2" />
                    Loading ...
                </div>
            )}
            {!loading && userData &&
                <>
                    <section className="mt-6">
                        <ProfileHeader
                            accountId={userData.userData[0].id}
                            authUserId={userData.userData[0].id}
                            name={userData.userData[0].name}
                            username={userData.userData[0].user_name}
                            imgUrl={userData.userData[0].pic_url}
                            bio={userData.userData[0].bio}
                            isCurrentUser={userData.is_currentuser}
                            {...(!userData.is_currentuser && { isFollowed: userData.is_followed })}
                        />
                    </section>
                    <section>
                        <Tabs defaultValue="reviews" className="w-full!">
                            <TabsList className="flex w-full justify-around bg-card">
                                <TabsTrigger className="w-1/3 py-2" value="reviews">{userData.postsList.length} Reviews</TabsTrigger>
                                <TabsTrigger className="w-1/3 py-2" value="followers">{userData.followers_list.length} Followers</TabsTrigger>
                                <TabsTrigger className="w-1/3 py-2" value="following">{userData.following_list.length} Following</TabsTrigger>
                            </TabsList>
                            <TabsContent className="text-foreground" value="reviews">
                                <section className={`mt-3 flex flex-col gap-4`}>
                                    {userData.postsList.length === 0 ? (
                                        <p className="no-result">No Reviews found</p>
                                    ) : (
                                        <>
                                            {userData.postsList.map((post: any) => (
                                                <ReviewCard
                                                    key={post.post.post_data.id}
                                                    id={post.post.post_data.id}
                                                    currentUserId={userData.userData[0].id}
                                                    content={post.post.post_data.text}
                                                    author={post.post.post_data.user_id}
                                                    createdAt={post.post.post_data.date_time}
                                                    is_liked={post.post.is_liked}
                                                    is_Bookmarked={post.post.is_bookmarked}
                                                    // comments={post.post.post_data.comments}
                                                    movieId={post.post.movie_data.movie_id}
                                                    username={userData.userData[0].user_name}
                                                    name={userData.userData[0].name}
                                                    pic_url={userData.userData[0].pic_url}
                                                    rate={post.post.post_data.rate}
                                                    year={post.post.movie_data[0].year}
                                                    title={post.post.movie_data[0].title}
                                                    posterLink={post.post.movie_data[0].posterLink}
                                                />
                                            ))}
                                        </>
                                    )}

                                </section>
                            </TabsContent>
                            <TabsContent className="text-foreground" value="followers">
                                {userData.followers_list.length == 0 ?
                                    <p className="no-result">You have no followers</p>
                                    :
                                    <>
                                        {userData.followers_list.map((follower: any) => (
                                            <Follower
                                                key={follower.id}
                                                id={follower.id}
                                                image_url={follower.pic_url}
                                                name={follower.name}
                                                username={follower.user_name}
                                            />
                                        ))}
                                    </>
                                }
                            </TabsContent>
                            <TabsContent className="text-foreground" value="following">
                                {userData.following_list.length == 0 ?
                                    <p className="no-result">You don't follow anyone</p>
                                    :
                                    <>
                                        {userData.following_list.map((follower: any) => (
                                            <Follower
                                                key={follower.id}
                                                id={follower.id}
                                                image_url={follower.pic_url}
                                                name={follower.name}
                                                username={follower.user_name}
                                            />
                                        ))}
                                    </>
                                }
                            </TabsContent>
                        </Tabs>
                    </section>
                </>
            }

        </>
    );
}

export default Page;