"use client"
import { addRemoveBookmark, addRemoveLike } from "@/lib/actions/review.actions";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import shortLocale from "@/lib/custom-locale";


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
    // likes: [],
    // comments: [],
    isComment?: boolean,
    movieId: string,
    title: string,
    posterLink: string,
    year: string
    rate: number,
}

let audio = new Audio("/assets/audio/mixkit-soap-bubble-sound.wav")

function likeToogler(currentValue: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, post_id: string) {
    const newValue = !currentValue;
    setState(newValue);
    if (!currentValue) audio.play();
    addRemoveLike(post_id);
}
function BookmarkToogler(currentValue: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, post_id: string) {
    const newValue = !currentValue;
    setState(newValue);
    if (!currentValue) audio.play();
    addRemoveBookmark(post_id);
}
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
    currentUserId,
    content,
    author,
    name,
    username,
    pic_url,
    createdAt,
    is_liked,
    is_Bookmarked,
    // comments,
    movieId,
    posterLink,
    title,
    year,
    // movieInfo,
    rate,
}: Props) => {

    const [isLiked, setIsLiked] = useState<boolean>(is_liked);

    const [isBookmarked, setIsBookmarked] = useState<boolean>(is_Bookmarked);

    return (
        <article className="bg-dark-3 p-3 py-3 pb-2 flex w-full flex-col rounded-xl">
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col justify-between min-h-[150px] max-w-[420px] max-sm:max-w-[280px]">
                    <div className="mb-2">
                        <Link href={`/profile/${author}`} className="flex items-center ">
                            <Image
                                src={pic_url}
                                alt={name}
                                width={36}
                                height={36}
                                className='border-[1px] border-neutral-600 cursor-pointer rounded-full object-contain'
                            />
                            <p className="ml-2 text-neutral-100 font-semibold">{name} <span className="text-neutral-600 font-medium">@{username} • </span><Link href={`/post/${id}`} className="text-neutral-600 font-medium hover:underline max-sm:hidden">{formatTimeAgo(createdAt)}</Link><Link href={`/post/${id}`} className="text-neutral-600 font-medium hover:underline sm:hidden">{formatTimeAgoSm(createdAt)}</Link></p>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/movie/${movieId}`}><h1 className="mb-2 font-lora text-neutral-100 text-[22px]">{title}<span className="font-lora text-neutral-500 font-normal"> . {year}</span></h1></Link>
                        <div className="mb-2 flex gap-1">
                            {Array.from({ length: rate }, (_, i) => (
                                <Image src="/assets/star_filled.svg" alt="rating" width={20} height={20} />
                            ))}
                            <span className="text-neutral-500 font-medium">({rate}/5)</span>
                        </div>
                        <Link href={`/post/${id}`}><p className="mb-1 font-inter text-neutral-100 font-normal">{content}</p></Link>
                    </div>
                </div>
                {posterLink ?
                    <Link href={`/movie/${movieId}`}><Image src={posterLink} alt="poster" width={100} height={180} className="rounded-xl mr-2" /></Link>
                    :
                    <Link href={`/movie/${movieId}`}><Image src={"/assets/no-img.svg"} alt="poster" width={100} height={180} className="rounded-xl mr-2" /></Link>
                }

            </div>
            <hr className="mt-2 mb-1 border-neutral-500" />
            <div className="flex w-full justify-around">
                <div className="flex items-center w-1/3 justify-center p-1 hover:bg-dark-4 rounded-md cursor-pointer" onClick={() => likeToogler(isLiked, setIsLiked, id)}>
                    {isLiked ?
                        <Image src="/assets/icons/activities/like_filled.svg" alt="like" width={20} height={20} />
                        :
                        <Image src="/assets/icons/activities/like.svg" alt="like" width={20} height={20} />
                    }
                    {isLiked ?
                        <p className="text-primary font-medium ml-2">like</p>
                        :
                        <p className="text-neutral-400 font-medium ml-2">like</p>
                    }
                </div>
                <Link href={`/post/${id}`} className="flex items-center w-1/3 justify-center p-1 hover:bg-dark-4 rounded-md">
                    <Image src="/assets/icons/activities/comment.svg" alt="comment" width={20} height={20} />
                    <p className="text-neutral-400 font-medium ml-2">comment</p>
                </Link>
                <div className="flex items-center w-1/3 justify-center p-1 hover:bg-dark-4 rounded-md cursor-pointer" onClick={() => { BookmarkToogler(isBookmarked, setIsBookmarked, id) }}>
                    {isBookmarked ?
                        <Image src="/assets/icons/activities/bookmark_filled.svg" alt="bookmark" width={20} height={20} />
                        :
                        <Image src="/assets/icons/activities/bookmark.svg" alt="bookmark" width={20} height={20} />
                    }
                    {isBookmarked ?
                        <p className="text-primary font-medium ml-2">bookmark</p>
                        :
                        <p className="text-neutral-400 font-medium ml-2">bookmark</p>
                    }
                </div>
            </div>
        </article>
    )
};



export default ReviewCard;

