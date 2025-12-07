'use client'

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import shortLocale from "@/lib/custom-locale";


interface Props {
    action: ( "like" | "comment" | "follow"),
    message: string,
    text: string,
    link_href: string,
    create_date: string
}
enum Activities {
    like = "/assets/icons/activities/like_green.svg",
    comment = "/assets/icons/activities/comment_filled.svg",
    follow = "/assets/icons/activities/follow_filled.svg",
}

function formatTimeAgoSm(date: Date | string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: shortLocale,
  });
}

const Activity = ({action, message, text, link_href, create_date}: Props) => {
    const formatted_text = text.length > 40 ? text.slice(0, 40) + "..." : text
    return (
                <Link href={link_href} className="flex justify-between items-center bg-card rounded-md p-2 py-4 border-l-4 border-primary mb-3">
                    <div className="flex gap-2 items-center">
                        <Image src={Activities[action]} alt={action} width="28" height="28"/>
                        <h1 className="text-foreground font-inter">{message} {text && `"${formatted_text}"`}</h1>
                    </div>
                    <p className="text-card-foreground font-semibold mx-2 text-center">{formatTimeAgoSm(create_date)}</p>
                </Link>
        
    )
}
export default Activity;