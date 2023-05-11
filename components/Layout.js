
import CNav from "./CollapsibleSideBar";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session } = useSession()
  const [showNav, setShowNav] = useState(false);
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
    <div className=" sm:w-screen md:w-screen lg:w-screen">
      <div className="z-20 fixed w-screen items-center bg-slate-900 text-white p-2">
        <div className="flex">
          <button className="flex gap-2 place-items-center" onClick={() => setShowNav(!showNav)}>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="flex grow justify-center mr-4">
            <Logo />
          </div>

        </div>

      </div>

      <div className="min-h-screen min-w-screen flex w-screen">


        <div className="md:w-screen sm:w-screen sm:h-full">

          {children}
          <ul class="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

        </div>
        <CNav show={showNav} />
      </div>

    </div>

  );
}
