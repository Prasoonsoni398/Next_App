import Link from "next/link"

export default function Navigation (){
    return(
        <header className="flex  h-16 items-center bg-amber-600 font-roboto text-white px-5">
           <div className="flex justify-between max-w-7xl w-full mx-auto">
             <Link href="/" className="text-blue-600 font-black text-xl " >
                NEXT
            </Link>
            <nav>
                <ul className="flex gap-10 text-white font-medium">
                    <li>
                        <Link href="/"  >Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/service">Service</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link href="/servercomponent">Server</Link>
                    </li>
                    <li>
                        <Link href="/clientcomponent ">Client</Link>
                    </li>
                </ul>
            </nav>
           </div>
        </header>
    )
}