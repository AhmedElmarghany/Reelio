"use client"

import CommentCard from "@/components/cards/CommentCard";
import ReviewCard from "@/components/cards/ReviewCard";
import Comment from "@/components/forms/Comment";
import Spinner from "@/components/icons/Spinner";
import { useGetPostQuery } from "@/lib/features/posts/postsApi"
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { useCurrentUserQuery } from "@/lib/features/auth/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Cookies from "js-cookie";

export default function Page() {
  const { id } = useParams() as { id: string };
  const { data: post, isLoading } = useGetPostQuery(id);
  const [comments, setComments] = useState<any[]>([]);



  useEffect(() => {
    if (post?.["post-comments"]) {
      setComments(post["post-comments"].slice().reverse());
    }
  }, [post]);

  const token: string = Cookies.get("token") as string;

  const currentUserDataRedux = useSelector((state: RootState) => state.user.user_data)

  const { isLoading: currentUserIsLoading } = useCurrentUserQuery(token!, {
    skip: currentUserDataRedux !== null, // Skip query if no token
  });

  if (currentUserIsLoading) return null;

  const handleCommentAdded = (newComment: any) => {
    setComments(prev => [newComment, ...prev]);
  };



  return (
    <>
      {isLoading &&
        <div className="flex items-center justify-center gap-2 w-full my-3 mt-6 text-center">
          <Spinner size={18} />
          <p> Loading...</p>
        </div>
      }
      {!isLoading && post && (
        <>
          <ReviewCard
            key={post["post-data"].id}
            id={post["post-data"].id}
            currentUserId={currentUserDataRedux?.id as string}
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
              currentUserImg={currentUserDataRedux?.pic_url as string}
              onCommentAdded={handleCommentAdded}

            />
          </div>
          {comments.length == 0 && <p className="no-result">There are no comments yet.</p>}
          {comments.length !== 0 &&
            comments.map((comment: any) => {
              return (
                <CommentCard
                  user_id={comment.user_id}
                  name={comment.name}
                  image_url={comment.pic_url}
                  text={comment.text}
                  created_date={comment.date_time}
                  key={comment.id}
                />
              )
            })
          }
        </>
      )}

    </>
  )
};