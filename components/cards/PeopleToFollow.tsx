'use client'

import Image from "next/image";
import Link from "next/link";
import FollowBtn from "../buttons/FollowBtn";

interface Props {
    userId: string,
    name: string, 
    username: string,
    image_url: string
}

export default function ({userId, name, username, image_url}: Props) {
    return (
        <Link href={`/profile/${userId}`} className="flex justify-between">
            <div className="flex gap-x-1 items-center">
                <div className="w-10 h-10 rounded-full bg-slate-400 overflow-hidden mr-1">
                    <Image src={image_url} alt="Profile Photo" width={32} height={32} className="h-full w-full object-cover"/>
                </div>
                <div>
                    <h1 className="font-inter text-neutral-50 font-semibold">{name}</h1>
                    <p className="text-neutral-600 font-medium font-inter text-[14px]">{username}</p>
                </div>
            </div>
            <FollowBtn 
            user_id={userId} 
            is_followed={false}
            />
        </Link>
    )
}
