
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return <Layout>
    <div className='text-black flex justify-between'>
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 rounded-lg pr-2 overflow-hidden text-lg justify-center items-center">
        <img src={session?.user?.image} referrerPolicy="no-referrer" className="w-10 h-10" />
        <span className="px-2 text-center w-full">
          {session?.user?.name}
        </span>
      </div>
    </div>
  </Layout>
}
