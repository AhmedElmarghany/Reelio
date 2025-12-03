import { SignIn } from "@/components/forms/SignIn";
import Link from "next/link";


export default function Page() {
  return(
      <div className="flex items-center justify-center h-[85vh] xl:justify-end xl:-translate-x-50">
        <div className="flex flex-col items-center justify-center p-4 py-9 max-w-xs:px-0 bg-card min-w-96 rounded-xl border border-border relative overflow-hidden max-w-xs:min-w-11/12" style={{
          backgroundImage: `url('/Green-Ellipse.png')`,
          backgroundSize: "cover",
          backgroundPosition: "60px -180px",
          backgroundRepeat: "no-repeat",
          // zIndex: -1,
          position: "absolute",
        }}>
          <h1 className="text-5xl font-lobster text-primary">Reelio</h1>
          <p className="font-inter text-[14px] text-card-foreground py-6">Please Enter your details to sign in</p>
          <SignIn />
          <h1 className="font-inter text-foreground text-[14px] py-6">You don&#39;t have an account? <Link href="/sign-up" className="text-primary">signup</Link></h1>
        </div>
      </div>

  )
}
