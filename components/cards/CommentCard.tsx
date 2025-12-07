import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import shortLocale from "@/lib/custom-locale";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


interface Params {
    user_id: string,
    name: string,
    image_url: string,
    text: string,
    created_date: string,
}
function formatTimeAgoSm(date: Date | string) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: shortLocale,
    });
}


const CommentCard = ({ user_id, name, image_url, text, created_date }: Params) => {
    return (
            <div className="flex gap-2 my-4">
                <Link href={`/profile/${user_id}`} className="min-w-9">
                    <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={image_url} alt="User Image" />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="py-2  px-3 rounded-xl border border-border-dark">
                    <Link href={`/profile/${user_id}`} className="font-inter text-foreground font-semibold text-[15px]">{name}<span className="text-card-foreground font-inter text-[14px]"> · {formatTimeAgoSm(created_date)}</span></Link>
                    <p className="text-[15px] font-inter text-foreground font-normal">{text}</p>
                </div>
            </div>
    )
}

export default CommentCard;