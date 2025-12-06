"use client"
import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import shortLocale from "@/lib/custom-locale";
import StarIcon from "../icons/StarIcon";
import CommentIcon from "../icons/CommentIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import LikeIcon from "../icons/LikeIcon";
import MoviePoster from "./MoviePoster";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useToggleBookmarkMutation, useToggleLikeMutation } from "@/lib/features/posts/postsApi";
// import { useSelector } from "react-redux";
// import { RootState } from "@/lib/store";


interface Props {
    id: string,
    currentUserId: string,
    content: string,
    author: string,
    name: string,
    username: string,
    pic_url: string,
    createdAt: string,
    is_liked: boolean,
    is_Bookmarked: boolean,
    isComment?: boolean,
    movieId: string,
    title: string,
    posterLink: string,
    year: string
    rate: string,
}

const playSound = () => {
    const audio = new Audio("/assets/audio/mixkit-soap-bubble-sound.wav");
    audio.play();
};


function formatTimeAgo(dateString: string): string {
    const createdAt = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";

    return formatDistanceToNowStrict(createdAt, { addSuffix: true });
}

function formatTimeAgoSm(date: Date | string) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: shortLocale,
    });
}



const ReviewCard = ({
    id,
    content,
    author,
    name,
    username,
    pic_url,
    createdAt,
    is_liked,
    is_Bookmarked,
    movieId,
    posterLink,
    title,
    year,
    rate,
}: Props) => {

    const [isLiked, setIsLiked] = useState<boolean>(is_liked);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(is_Bookmarked);

    const [toggleLike] = useToggleLikeMutation();
    const [toggleBookmark] = useToggleBookmarkMutation();

    function likeToogler(currentValue: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, post_id: string) {
        const newValue = !currentValue;
        setState(newValue);
        toggleLike({ post_id: post_id });
    }
    function BookmarkToogler(currentValue: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, post_id: string) {
        const newValue = !currentValue;
        setState(newValue);
        toggleBookmark({ post_id: post_id });
    }

    return (
        <article className="bg-background p-3 py-3 pb-2 flex w-full flex-col rounded-[0.625rem] border border-border-dark">
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col justify-between min-h-[150px] max-w-[420px] max-sm:max-w-[280px]">
                    <div className="mb-2">
                        <Link href={`/profile/${author}`} className="flex items-center ">
                            <Avatar className="h-8 w-8 rounded-full border border-border-dark cursor-pointer">
                                <AvatarImage src={pic_url} alt={name} />
                                <AvatarFallback>{name[0]}</AvatarFallback>
                            </Avatar>
                            <p className="ml-2 text-foreground font-semibold text-[15px]">{name} <span className="text-card-foreground font-inter text-[14px]">@{username} · </span><Link href={`/post/${id}`} className="text-card-foreground font-inter text-[14px] hover:underline max-sm:hidden">{formatTimeAgo(createdAt)}</Link><Link href={`/post/${id}`} className="text-card-foreground font-medium hover:underline sm:hidden">{formatTimeAgoSm(createdAt)}</Link></p>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/movie/${movieId}`}><h1 className="movie_title mb-2 text-[20px]">{title}<span className="font-inter text-card-foreground text-[16px]">&nbsp;{year}</span></h1></Link>
                        <div className="mb-2 flex gap-1">
                            {Array.from({ length: Number(rate) }, (_, i) => (
                                <StarIcon key={i} size={18} />
                            ))}
                            <span className="font-inter text-card-foreground text-[14px]">&nbsp;{rate}/5</span>
                        </div>
                        <Link href={`/post/${id}`}><p className="mb-1 font-inter text-foreground font-normal">{content}</p></Link>
                    </div>
                </div>
                <div className="ml-2">
                    <Link href={`/movie/${movieId}`}>
                        <MoviePoster poster_path={posterLink} size="medium" />
                    </Link>
                </div>

            </div>
            <hr className="mt-2 mb-1 border-border-dark" />
            <div className="flex w-full justify-around">
                <div className="flex items-center w-1/3 justify-center p-1 hover:bg-card-hover rounded-md cursor-pointer" onClick={() => { likeToogler(isLiked, setIsLiked, id); if (!isLiked) { playSound() }; }}>
                    <LikeIcon isFilled={isLiked} />
                    {isLiked ?
                        <p className="text-primary font-medium ml-2">like</p>
                        :
                        <p className="text-card-foreground font-medium ml-2">like</p>
                    }
                </div>
                <Link href={`/post/${id}`} className="flex items-center w-1/3 justify-center p-1 hover:bg-card-hover rounded-md">
                    <CommentIcon />
                    <p className="text-card-foreground font-medium ml-2">comment</p>
                </Link>
                <div className="flex items-center w-1/3 justify-center p-1 hover:bg-card-hover rounded-md cursor-pointer" onClick={() => { BookmarkToogler(isBookmarked, setIsBookmarked, id); if (!isBookmarked) { playSound() }; }}>
                    <BookmarkIcon isFilled={isBookmarked} />
                    {isBookmarked ?
                        <p className="text-primary font-medium ml-2">bookmark</p>
                        :
                        <p className="text-card-foreground font-medium ml-2">bookmark</p>
                    }
                </div>
            </div>
        </article>
    )
};



export default ReviewCard;

