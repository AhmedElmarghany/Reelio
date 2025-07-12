import { SignIn } from "@/components/forms/SignIn";
import Image from "next/image";
import Link from "next/link";


export default function Page() {
  return(
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center p-4 bg-dark-2 min-w-96 rounded-xl border-2 border-dark-4">
          <Image src={"/full_logo.svg"} width={140} height={100} alt="logo" className="mb-4"/>
          <hr className="border-neutral-600 w-36"/>
          <h1 className="text-primary font-semibold py-3">Sign In</h1>
          <SignIn />
          <h1 className="text-neutral-100 py-3">You don't have an account? <Link href="/sign-up" className="text-primary">signup</Link></h1>
        </div>
    </div>
  )
}
