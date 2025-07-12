"use client"

import Follower from "@/components/cards/Follower";
import ReviewCard from "@/components/cards/ReviewCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
// import { fetchUser } from "@/lib/actions/user.actions";
// import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchProfile } from "@/lib/actions/profile.actions";


function Page({params}: {params: {id: string}}){

    // const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
        const [userData, setUserData] = useState<any>(null);
        const [loading, setLoading] = useState(true);
        
    
        // 1. Get list of favourite IDs from your API
        useEffect(() => {
            const getProfileData = async () => {
                try {
                    const data = await fetchProfile(params.id); // API بتاعك
                    setUserData(data);
                    setLoading(false);
                    // console.log(data)
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
                    <section>
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
                        <Tabs defaultValue="reviews" className="w-full">
                            <TabsList className="flex justify-around bg-dark-1">
                                <TabsTrigger className="w-1/3 py-2" value="reviews">{userData.postsList.length} Reviews</TabsTrigger>
                                <TabsTrigger className="w-1/3 py-2" value="followers">{userData.followers_list.length} Followers</TabsTrigger>
                                <TabsTrigger className="w-1/3 py-2" value="following">{userData.following_list.length} Following</TabsTrigger>
                            </TabsList>
                            <TabsContent className="text-white" value="reviews">
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
                            <TabsContent className="text-white" value="followers">
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
                            <TabsContent className="text-white" value="following">
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
//  <>
//                     <section>
//                         <ProfileHeader
//                             accountId={userData.userData[0].id}
//                             authUserId={userData.userData[0].id}
//                             name={userData.userData[0].name}
//                             username={userData.userData[0].user_name}
//                             imgUrl={userData.userData[0].pic_url}
//                             bio={userData.userData[0].bio}
//                             isCurrentUser={userData.is_currentuser}
//                             {...(!userData.is_currentuser && { isFollowed:userData.is_followed })}
//                         />
//                     </section>
//                     <section>
//                         <Tabs defaultValue="reviews" className="w-full">
//                             <TabsList className="flex justify-around bg-dark-1">
//                                 <TabsTrigger className="w-1/3 py-2" value="reviews">{userData.postsList.length} Reviews</TabsTrigger>
//                                 <TabsTrigger className="w-1/3 py-2" value="followers">{userData.followers_list.length} Followers</TabsTrigger>
//                                 <TabsTrigger className="w-1/3 py-2" value="following">{userData.following_list.length} Following</TabsTrigger>
//                             </TabsList>
//                             <TabsContent className="text-white" value="reviews">
//                                 <section className={`mt-3 flex flex-col gap-4`}>
//                                     {userData.postsList.length === 0 ? (
//                                         <p className="no-result">No Reviews found</p>
//                                     ) : (
//                                         <>
//                                             {userData.postsList.map((post: any) => (
//                                                 <ReviewCard
//                                                     key={post.post.post_data.id}
//                                                     id={post.post.post_data.id}
//                                                     currentUserId={userData.userData[0].id}
//                                                     content={post.post.post_data.text}
//                                                     author={post.post.post_data.user_id}
//                                                     createdAt={post.post.post_data.date_time}
//                                                     is_liked={post.post.is_liked}
//                                                     is_Bookmarked={post.post.is_bookmarked}
//                                                     comments={post.post.post_data.comments}
//                                                     movieId={post.post.movie_data.movie_id}
//                                                     username={userData.userData[0].id}
//                                                     name={userData.userData[0].name}
//                                                     pic_url={userData.userData[0].pic_url}
//                                                     rate={post.post.post_data.rate}
//                                                     year={post.post.movie_data[0].year}
//                                                     title={post.post.movie_data[0].title}
//                                                     posterLink={post.post.movie_data[0].posterLink}
//                                                 />
//                                             ))}
//                                         </>
//                                     )}

//                                 </section>
//                             </TabsContent>
//                             <TabsContent className="text-white" value="followers">
//                                 {userData.followers_list.length == 0?
//                                     <p className="no-result">You have no followers</p>
//                                     :
//                                     <>
//                                             {userData.followers_list.map((follower: any) => (
//                                                 <Follower
//                                                 key={follower.id}
//                                                 id={follower.id}
//                                                 image_url={follower.pic_url}
//                                                 name={follower.name}
//                                                 username={follower.user_name}
//                                                 />
//                                             ))}
//                                         </>
//                                 }
//                             </TabsContent>
//                             <TabsContent className="text-white" value="following">
//                                 {userData.followers_list.length == 0?
//                                     <p className="no-result">You don't follow anyone</p>
//                                     :
//                                     <>
//                                             {userData.following_list.map((follower: any) => (
//                                                 <Follower
//                                                 key={follower.id}
//                                                 id={follower.id}
//                                                 image_url={follower.pic_url}
//                                                 name={follower.name}
//                                                 username={follower.user_name}
//                                                 />
//                                             ))}
//                                         </>
//                                 }
//                             </TabsContent>
//                         </Tabs>
//                     </section>
//                 </>

// const profileData = {
//             "is_currentuser": true,
//             "userData": [
//                 {
//                     "id": "37",
//                     "name": "mohamed",
//                     "user_name": "mohamed",
//                     "pic_url": "https://nf0yc7fr11.ufs.sh/f/GdHX5LIa5ZQEx2lY5qFOCtIKd3h2N9AioeBlZf1GpULr4vTD",
//                     "email": "mohamed@mail.com",
//                     "password": "$2y$10$gDHlGRRCdHOqp0n3pfFphef3Ovx0xenk4NjmZZc6mKSR3YYdHQovu",
//                     "birth_date": "2000-08-05",
//                     "join_date": "2025-05-10 15:57:18",
//                     "bio": "just bio\n",
//                     "onboarded": "1",
//                     "api_token": "3494093c30d2e8ff"
//                 }
//             ],
//             "following_list": []
//             ,
//             "followers_list": [
//                 {
//                     "id": "26",
//                     "name": "amir",
//                     "user_name": "amirfouda",
//                     "pic_url": "https://nf0yc7fr11.ufs.sh/f/GdHX5LIa5ZQEHGuSpnosZV3nQFjSEUOg0Ml4yWTxuLpatv8Y",
//                     "email": "amir@mail.com",
//                     "password": "$2y$10$cRjdumB7eKSRj5Bo02vgqOWtrPIY6LGcFgrMG8Nu.YO2TkOJ2/PD2",
//                     "birth_date": "2002-03-03",
//                     "join_date": "2025-04-17 00:24:58",
//                     "bio": "",
//                     "onboarded": "1",
//                     "api_token": "9d900da09a2be483"
//                 }
//             ]
//             ,
//             "postsList": [
//                 {
//                     "post": {
//                         "post_data": {
//                             "post_id": "28",
//                             "user_id": "37",
//                             "movie_id": "475557",
//                             "text": "great!",
//                             "date_time": "2025-07-07 02:41:06",
//                             "rate": "4",
//                             "likes": "0",
//                             "comments": "0"
//                         },
//                         "movie_data": [
//                             {
//                                 "id": "5",
//                                 "movie_id": "475557",
//                                 "title": "Joker",
//                                 "posterLink": "https://image.tmdb.org/t/p/w1280/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
//                                 "year": "2019"
//                             }
//                         ],
//                         "likes": [],
//                         "comments": [],
//                         "is_liked": false,
//                         "is_bookmarked": false
//                     }
//                 },
//                 {
//                     "post": {
//                         "post_data": {
//                             "post_id": "29",
//                             "user_id": "37",
//                             "movie_id": "475557",
//                             "text": "great!",
//                             "date_time": "2025-07-07 02:41:07",
//                             "rate": "4",
//                             "likes": "0",
//                             "comments": "0"
//                         },
//                         "movie_data": [
//                             {
//                                 "id": "5",
//                                 "movie_id": "475557",
//                                 "title": "Joker",
//                                 "posterLink": "https://image.tmdb.org/t/p/w1280/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
//                                 "year": "2019"
//                             }
//                         ],
//                         "likes": [],
//                         "comments": [],
//                         "is_liked": false,
//                         "is_bookmarked": true
//                     }
//                 },
//                 {
//                     "post": {
//                         "post_data": {
//                             "post_id": "30",
//                             "user_id": "37",
//                             "movie_id": "278",
//                             "text": "wow",
//                             "date_time": "2025-07-07 02:41:39",
//                             "rate": "5",
//                             "likes": "1",
//                             "comments": "0"
//                         },
//                         "movie_data": [
//                             {
//                                 "id": "6",
//                                 "movie_id": "278",
//                                 "title": "The Shawshank Redemption",
//                                 "posterLink": "https://image.tmdb.org/t/p/w1280/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
//                                 "year": "1994"
//                             }
//                         ],
//                         "likes": [
//                             {
//                                 "id": "77",
//                                 "user_id": "37",
//                                 "post_id": "30",
//                                 "date_time": "2025-07-07 18:24:45"
//                             }
//                         ],
//                         "comments": [],
//                         "is_liked": true,
//                         "is_bookmarked": false
//                     }
//                 }
//             ]
//         };