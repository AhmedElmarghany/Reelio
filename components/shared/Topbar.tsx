import { CurrentUser } from "@/lib/actions/currentUser.actions";
import Image from "next/image";
import Link from "next/link";

async function Topbar(){
    const user = await CurrentUser();
    return (
        <nav className="topbar lg:px-32">

            <Link href="/" className="flex items-center gap-4">
                <Image src="/logo.svg" alt="logo" width={28} height={28}></Image>
                <p className="font-lora text-heading3-bold text-light-1 max-lg:hidden">Reelio</p>
            </Link>

            <div className="font-lobster text-primary text-heading2-semibold max-md:hidden xl:mr-32">Share Your Voice, Shape the Reel!</div>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <div>
                        <Image src={"/assets/logout.svg"} alt="signout" width={24} height={24} />
                    </div>
                </div>
                {user.isLoggedIn ?
                    <div>
                        {user.userData?.pic_url ?
                            <Link href='/profile' className="flex items-center bg-dark-1 bg-opacity-30 p-1 rounded-sm hover:bg-dark-4">
                                <Image src={user.userData?.pic_url} alt="profile photo" width={18} height={18} className="w-7 h-7 rounded-full border-neutral-600 border-[1px]" />
                                <h1 className="text-neutral-100 mx-4 ">{user.userData?.name}</h1>
                            </Link>
                            :
                            <Link href='/profile' className="flex items-center bg-dark-3 bg-opacity-30 p-1 rounded-sm hover:bg-dark-4">
                                <Image src={"/assets/profile.svg"} alt="profile photo" width={18} height={18} className="w-7 h-7 bg-neutral-900 rounded-full border-neutral-600 border-[1px] p-1" />
                                <h1 className="text-neutral-100 mx-4 ">{user.userData?.name}</h1>
                            </Link>

                        }
                    </div>
                    :
                    <Link href="/sign-in" className="text-neutral-900 font-semibold bg-primary py-2 px-4 rounded-sm">Login</Link>
                }
            </div>
        </nav>
    )
}

export default Topbar;