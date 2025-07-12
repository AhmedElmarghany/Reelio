'use client'

import Image from "next/image";
import { useState } from "react";

export default function UnFollowBtn() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {!hovered && <h1 className="text-neutral-50 p-2 px-5 font-bold rounded-full border-[1px] border-dark-4  cursor-pointer">Following</h1>}
            {hovered && <h1 className="text-red-700 p-2 px-5 font-bold rounded-full border-[1px] border-red-700 cursor-pointer"> Unfollow </h1>}

        </div>
    );
}
