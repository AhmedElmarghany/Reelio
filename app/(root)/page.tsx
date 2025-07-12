import { fetchPosts } from "@/lib/actions/review.actions";
import  ReviewCard  from "@/components/cards/ReviewCard"
import { Lobster, Lora, Inter } from "next/font/google";
import { CurrentUser } from "@/lib/actions/currentUser.actions";
import { redirect } from "next/navigation";


// const lobster = Lobster({
//   weight: "400",
//   variable: "--font-lobster",
//   subsets: ["latin"],
// });
const lora = Lora({
  weight: "500",
  variable: "--font-lora",
  subsets: ["latin"],
});
// const inter = Inter({
//   weight: ["300", "400", "700"],
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// font-lobster
// font-lora
// font-inter
// font-light font-normal font-bold
// text-neutral-500
export default async function Home() {
  const results = await fetchPosts();
  
  const user = await CurrentUser();
  
  if(!user.isLoggedIn) redirect("/sign-in");



  return (
    <>
      <section className={`${lora.variable} mt-0 flex flex-col gap-2 max-sm:gap-4`}>
        {results.postsList.length === 0 ?(
          <p className="no-result">There are no reviews yet.</p>
        ) : (
          <>
          {results.postsList.map((post:any) => (
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
          ))}
          </>
        )}

      </section>
    </>
  );
}
