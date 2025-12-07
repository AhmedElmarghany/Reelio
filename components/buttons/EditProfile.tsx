import Link from "next/link";
import Image from "next/image";

export default function EditProfile(){
    return(
        <Link href='/profile/edit' className="flex bg-card hover:bg-card-hover rounded-md gap-3 p-3">
            <Image src="/assets/icons/edit.svg" alt="edit profile" width={24} height={24}/>
            <p className="text-card-foreground font-noraml leading-relaxed max-sm:hidden">Edit profile</p>
        </Link>
    )
}