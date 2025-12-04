import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useLogoutMutation } from "@/lib/features/auth/authApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


const LogoutDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
    const router = useRouter();
    const [logout, { isLoading }] = useLogoutMutation();


    const handleLogoutSubmit = async () => {
        try {
            const token: string = Cookies.get("token") as string;
            await logout(token).unwrap();
            router.push("/sign-in");
        } catch (err) {
            console.error("Logout failed:", err);
        }
        onOpenChange(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        You need to logout?
                        <br />
                        you will redirected to login page.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading} className="w-1/2 rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleLogoutSubmit}
                        disabled={isLoading}
                        className="w-1/2 rounded-xl destructive hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging out...
                            </>
                        ) : (
                            'Logout'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutDialog