'use client'

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import shortLocale from "@/lib/custom-locale";


interface Props {
    image_url: string,
    message: string,
    text: string,
    link_href: string,
    create_date: string
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

export default function ({image_url, message, text, link_href, create_date}: Props) {
    const formatted_text = text.length > 40 ? text.slice(0, 40) + "..." : text
  return (
    <Link href={link_href} className="flex justify-between items-center bg-dark-3 rounded-md p-2 py-4 border-l-4 border-primary mb-3">
      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 rounded-full bg-dark-4 overflow-hidden flex-shrink-0">
          <Image src={image_url} alt="profile picture" width="28" height="28" className="h-full w-full object-cover" />
        </div>
        <h1 className="text-white font-inter">{message} {text && `"${formatted_text}"`}</h1>
      </div>
      {/* <p className="text-neutral-500 font-semibold mr-2 text-center max-lg:hidden">{formatTimeAgo(create_date)}</p> */}
      <p className="text-neutral-500 font-semibold mx-2 text-center">{formatTimeAgoSm(create_date)}</p>
    </Link>
        
    )
}