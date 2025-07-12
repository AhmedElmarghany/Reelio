"use client"

import { fetchOnePost } from "@/lib/actions/review.actions";
// import Image from "next/image";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ReviewCard from "@/components/cards/ReviewCard";
import CommentCard from "@/components/cards/CommentCard";
import { CurrentUser } from "@/lib/actions/currentUser.actions";
import Comment from "@/components/forms/Comment";
import { useRouter } from "next/navigation";



export default function Page(){
    // const params = useParams();
    const { id } = useParams() as {id: string};
    const [ post, setPost ] = useState<any>(null);
    const [ loading, setLoading ] = useState(true);
    const [ currentUser, setCurrentUser ] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const router = useRouter();


useEffect(() => {
  const fetchPost = async () => {
    try {
      const res: any = await fetchOnePost(id);
      setPost(res);
      // setComments(res["post-comments"])
      setComments(res["post-comments"].slice().reverse());
      setLoading(false)
      console.log(res);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  fetchPost();
}, []);

useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const res: any = await CurrentUser();
      setCurrentUser(res);
      console.log(res)
    } catch (error) {
      console.error('Failed to fetch currentUser:', error);
    }
  };

  fetchCurrentUser();
}, []);


const handleCommentAdded = (newComment: any) => {
  setComments(prev => [newComment, ...prev]); // ← إضافة الكومنت الجديد
};



  return (
        <>
            {loading && (
                <div className="text-center mt-10 text-primary">
                    <Loader2 className="animate-spin inline mr-2" />
                    Loading ...
                </div>
            )}
            {/* {!loading && post && ( */}
            {!loading && currentUser && post && (
                <>
                    <ReviewCard
                        key={post["post-data"].id}
                        id={post["post-data"].id}
                        currentUserId={currentUser.userData.id}
                        content={post["post-data"].text}
                        author={post["post-data"].user_id}
                        createdAt={post["post-data"].date_time}
                        is_liked={post.is_liked}
                        is_Bookmarked={post.is_bookmarked}
                        movieId={post.movie_data[0].movie_id}
                        username={post["post-data"].user_name}
                        name={post["post-data"].name}
                        pic_url={post["post-data"].pic_url}
                        rate={post["post-data"].rate}
                        year={post.movie_data[0].year}
                        title={post.movie_data[0].title}
                        posterLink={post.movie_data[0].posterLink}
                    />
                    <div className="mt-7">
                        <Comment 
                            postId={post["post-data"].post_id}
                            currentUserImg={currentUser.userData.pic_url}
                            onCommentAdded={handleCommentAdded}
                            
                        />
                    </div>
                    {comments.length == 0 && <p className="no-result">There are no comments yet.</p>}
                    {comments.length !== 0 &&
                    comments.map((comment:any)=>{return(
                        <CommentCard
                            user_id= {comment.user_id}
                            name={comment.name}
                            image_url={comment.pic_url}
                            text={comment.text}
                            created_date={comment.date_time}
                        />
                    )})
                    }
                </>
            )}
        </>
    )
};


// الكود الأصلي
// "use client"

// import { fetchOnePost } from "@/lib/actions/review.actions";
// // import Image from "next/image";
// import { useParams } from 'next/navigation'
// import { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";
// import ReviewCard from "@/components/cards/ReviewCard";
// import CommentCard from "@/components/cards/CommentCard";
// import { CurrentUser } from "@/lib/actions/currentUser.actions";
// import Comment from "@/components/forms/Comment";
// import { useRouter } from "next/navigation";



// export default function Page(){
//     // const params = useParams();
//     const { id } = useParams() as {id: string};
//     const [ post, setPost ] = useState<any>(null);
//     const [ loading, setLoading ] = useState(true);
//     const [ currentUser, setCurrentUser ] = useState<any>(null);
//       const router = useRouter();


// useEffect(() => {
//   const fetchPost = async () => {
//     try {
//       const res: any = await fetchOnePost(id);
//       setPost(res);
//       setLoading(false)
//       console.log(res);
//     } catch (error) {
//       console.error('Failed to fetch post:', error);
//     }
//   };

//   fetchPost();
// }, []);

// useEffect(() => {
//   const fetchCurrentUser = async () => {
//     try {
//       const res: any = await CurrentUser();
//       setCurrentUser(res);
//       console.log(res)
//     } catch (error) {
//       console.error('Failed to fetch currentUser:', error);
//     }
//   };

//   fetchCurrentUser();
// }, []);


//   const handleCommentAdded = () => {
//     router.refresh(); // أو أي طريقة لتحديث الكومنتات
//     console.log("that doesn't display")
//   };



//   return (
//         <>
//             {loading && (
//                 <div className="text-center mt-10 text-primary">
//                     <Loader2 className="animate-spin inline mr-2" />
//                     Loading ...
//                 </div>
//             )}
//             {/* {!loading && post && ( */}
//             {!loading && currentUser && post && (
//                 <>
//                     <ReviewCard
//                         key={post["post-data"].id}
//                         id={post["post-data"].id}
//                         currentUserId={currentUser.userData.id}
//                         content={post["post-data"].text}
//                         author={post["post-data"].user_id}
//                         createdAt={post["post-data"].date_time}
//                         is_liked={post.is_liked}
//                         is_Bookmarked={post.is_bookmarked}
//                         movieId={post.movie_data[0].movie_id}
//                         username={post["post-data"].user_name}
//                         name={post["post-data"].name}
//                         pic_url={post["post-data"].pic_url}
//                         rate={post["post-data"].rate}
//                         year={post.movie_data[0].year}
//                         title={post.movie_data[0].title}
//                         posterLink={post.movie_data[0].posterLink}
//                     />
//                     <div className="mt-7">
//                         <Comment 
//                             postId={post["post-data"].post_id}
//                             currentUserImg={currentUser.userData.pic_url}
//                             onCommentAdded={handleCommentAdded}
//                         />
//                     </div>
//                     {post["post-comments"].length == 0 && <p className="text-[14px] font-semibold text-neutral-400 my-3 text-center">There are no comments yet.</p>}
//                     {post["post-comments"].length !== 0 &&
//                     post["post-comments"].map((comment:any)=>{return(
//                         <CommentCard
//                             user_id= {comment.user_id}
//                             name={comment.name}
//                             image_url={comment.pic_url}
//                             text={comment.text}
//                             created_date={comment.date_time}
//                         />
//                     )})
//                     }
//                 </>
//             )}
//         </>
//     )
// };
