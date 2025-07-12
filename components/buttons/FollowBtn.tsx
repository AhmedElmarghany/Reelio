"use client"

import { addRemoveFollow } from "@/lib/actions/follow.actions";
import { useState } from "react";

let audio = new Audio("/assets/audio/mixkit-soap-bubble-sound.wav")

function followToggler(currentValue: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, user_id: string){
    const newValue = !currentValue;
    setState(newValue);
    audio.play();
    addRemoveFollow(user_id);
}
// function BookmarkToogler(currentValue: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, post_id: string){
//     const newValue = !currentValue;
//     setState(newValue);
//     if(!currentValue) audio.play();
//     addRemoveBookmark(post_id);
// }
export default function FollowBtn({user_id, is_followed}: {user_id: string, is_followed: boolean}) {
        const [hovered, setHovered] = useState<boolean>(false);
        const [isFollowed, setIsFollowed] = useState<boolean>(is_followed)
    
    return (
        <>
        {isFollowed? 
    <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={()=>{followToggler(isFollowed, setIsFollowed, user_id)}}
            >
                {!hovered && <h1 className="text-neutral-50 p-2 px-5 font-bold rounded-full border-[1px] border-dark-4  cursor-pointer">Following</h1>}
                {hovered && <h1  className="text-red-700 p-2 px-5 font-bold rounded-full border-[1px] border-red-700 cursor-pointer"> Unfollow </h1>}

            </div>
            : 
            <div>
                <h1 className="text-neutral-50 p-2 px-5 font-bold rounded-full border-[1px] border-dark-4 hover:border-0 hover:bg-primary hover:text-dark-4 cursor-pointer" onClick={()=>{followToggler(isFollowed, setIsFollowed, user_id)}}>Follow</h1>
            </div>

    }
            
        </>
    )
}