import Nav from "@/components/Nav";
import CNav from "./CollapsibleSideBar";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Layout({ children }) {
    const { data: session } = useSession()
    if (!session) {
        return (
            <div className="bg-gradient-to-bl from-gray-900 via-slate-900 to-slate-800 w-screen h-screen flex items-center">
                <div className="text-center w-full">
                    <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-md text-black">Login with Google</button>
                </div>
            </div>
        )
    }
    return (
        <div className=" min-h-screen flex ">
            <CNav />
            <div className="bg-slate-800 w-[120%] p-4 ">
                {children}
            </div>
        </div>

    );
}
