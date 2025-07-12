import Image from "next/image";
import Link from "next/link";
import FollowBtn from "../buttons/FollowBtn";
import UnFollowBtn from "../buttons/UnFollowBtn";

export default function ({id, image_url, name, username}: {id:string, image_url: string, name: string, username: string}) {
    return (
        <Link href={`/profile/${id}`} className="flex justify-between items-center my-3 mt-4 border-y border-dark-4 p-2 rounded-md hover:bg-dark-2 hover:border-transparent">
            <div className="flex gap-x-1 items-center">
                <div className="w-10 h-10 rounded-full bg-slate-400 overflow-hidden mr-1">
                    {image_url == "null"? 
                    <Image src={'/assets/profile.svg'} alt="Profile Photo" width={32} height={32} className="h-full w-full object-cover"/>
                    :
                    <Image src={image_url} alt="Profile Photo" width={32} height={32} className="h-full w-full object-cover"/>
                    }
                </div>
                <div>
                    <h1 className="font-inter text-neutral-50 font-semibold">{name}</h1>
                    <p className="text-neutral-600 font-medium font-inter text-[14px]">{username}</p>
                </div>
            </div>
        </Link>
    )
}
