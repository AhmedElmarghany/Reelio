"use client"

import { useFollowUnfollowMutation } from "@/lib/features/user/userApi";
import { useState } from "react";

const playSound = () => {
    const audio = new Audio("/assets/audio/mixkit-soap-bubble-sound.wav");
    audio.play();
};

export default function FollowBtn({ user_id, is_followed }: { user_id: string, is_followed: boolean }) {
    const [hovered, setHovered] = useState<boolean>(false);
    const [isFollowed, setIsFollowed] = useState<boolean>(is_followed)
    // const [followUnfollow, { isLoading: followIsLoading, isSuccess: followIsSuccess, isError: followIsError, error: followError }] = useFollowUnfollowMutation();
    const [followUnfollow] = useFollowUnfollowMutation();


    function followToggler(currentValue: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, user_id: string) {
        const newValue = !currentValue;
        setState(newValue);
        followUnfollow({ user_id: user_id });
    }

    return (
        <>
            {isFollowed ?
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => { followToggler(isFollowed, setIsFollowed, user_id); playSound(); }}
                >
                    {!hovered && <h1 className="text-foreground p-2 px-5 font-bold rounded-full border border-border-dark  cursor-pointer">Following</h1>}
                    {hovered && <h1 className="text-accent p-2 px-5 font-bold rounded-full border border-accent cursor-pointer"> Unfollow </h1>}

                </div>
                :
                <div>
                    <h1 className="text-foreground p-2 px-5 font-bold rounded-full border border-border-dark hover:border-0 hover:bg-primary hover:text-primary-foreground cursor-pointer" onClick={() => { followToggler(isFollowed, setIsFollowed, user_id); playSound(); }}>Follow</h1>
                </div>
            }

        </>
    )
}