import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import shortLocale from "@/lib/custom-locale";


interface Params {
    user_id: string,
    name: string,
    image_url: string,
    text: string,
    created_date: string,
    is_currenr_user?: boolean
}
function formatTimeAgoSm(date: Date | string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: shortLocale,
  });
}


export default function({user_id, name, image_url, text, created_date, is_currenr_user}: Params){
    return(
        <>
            {/* <div className="p-2 gap-2 w-full bg-dark-3 rounded-md">
                <Link href={`/profile/${user_id}`} className="flex gap-x-1 items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-400 overflow-hidden mr-1">
                        {image_url == ""? 
                        <Image src={'/assets/profile.svg'} alt="Profile Photo" width={18} height={18} className="h-full w-full object-cover"/>
                        :
                        <Image src={image_url} alt="Profile Photo" width={18} height={18} className="h-full w-full object-cover" />
                        }
    
                    </div>
                    <div className="flex w-full justify-between">
                        <h1 className="font-inter text-neutral-50 font-medium text-[14px]">{name}</h1>
                        <p className="text-neutral-600 font-medium font-inter text-[14px]">{formatTimeAgoSm(created_date)}</p>
                    </div>
                </Link>
                <div className="mt-2">
                    <p className="font-inter text-neutral-50 text-[14px]">{text}</p>
                </div>
            </div> */}
            <div className="flex gap-2 my-4">
                {/* <div className="w-8 h-8 rounded-full bg-slate-400 overflow-hidden"> */}
                <Link href={`/profile/${user_id}`} className="min-w-9">
                        
                        <Image 
                            src={ image_url || "/assets/profile.svg" } 
                            alt="Profile Photo" 
                            width={32}
                            height={32}
                            className="cursor-pointer rounded-full object-contain"
                        />
                    
                </Link>
                <div className="bg-dark-2 py-2  px-3 rounded-2xl">
                    <Link href={`/profile/${user_id}`} className="text-white font-semibold text-[14px] font-inter">{name}<span className="text-[13px] text-neutral-400 font-medium"> . {formatTimeAgoSm(created_date)}</span></Link>
                    <p className="text-[#E2E5E9] text-[15px] font-inter">{text}</p>
                </div>
            </div>
        </>
    )
}