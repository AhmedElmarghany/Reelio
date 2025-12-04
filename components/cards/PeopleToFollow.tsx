'use client'

import Link from "next/link";
import FollowBtn from "../buttons/FollowBtn";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    userId: string,
    name: string,
    username: string,
    image_url: string
}

const PeopleToFollow = ({ userId, name, username, image_url }: Props) => {
    return (
        <div className="flex justify-between items-center hover:bg-card-hover py-3 px-1 rounded-xl">
                <Link href={`/profile/${userId}`} className="flex gap-x-1 items-center">
                    <Avatar className="h-10 w-10 rounded-full mr-1">
                        <AvatarImage src={image_url} alt={name} />
                        <AvatarFallback className="rounded-lg">{name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="font-inter text-foreground font-semibold">{name}</h1>
                        <p className="text-card-foreground font-medium font-inter text-[14px]">@{username}</p>
                    </div>
                </Link>
                <FollowBtn
                    user_id={userId}
                    is_followed={false}
                />
        </div>
    )
}

export default PeopleToFollow;