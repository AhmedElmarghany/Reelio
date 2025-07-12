import Link from "next/link";
import Image from "next/image";

export default function EditProfile(){
    return(
        <Link href='/profile/edit' className="flex bg-dark-3 hover:bg-dark-4 rounded-md gap-3 p-3">
            <Image src="/assets/icons/edit.svg" alt="edit profile" width={24} height={24}/>
            <p className="text-light-2 font-noraml leading-relaxed max-sm:hidden">Edit profile</p>
        </Link>
    )
}