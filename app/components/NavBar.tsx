import Link from "next/link";
import { FaYoutube, FaTwitter, FaGithub, FaLaptop } from "react-icons/fa";

export default function NavBar() {
   return (
      <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
         <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row md:px-6">
            <h1 className="lg:text-4xl text-3xl font-bold text-white grid place-content-center mb-2 lg:mb-0">
               <Link
                  href="/"
                  className="no-underline hover:text-white text-white/90 h-min"
               >
                  Home
               </Link>
            </h1>
            <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 mb-4 text-white text-4xl lg:text-5xl h-5">
               <Link
                  className="text-white/90 hover:text-white h-min"
                  href="https://youtube.com"
               >
                  <FaYoutube />
               </Link>
               <Link
                  className="text-white/90 hover:text-white h-min"
                  href="https://wikipedia.com"
               >
                  <FaLaptop />
               </Link>
               <Link
                  className="text-white/90 hover:text-white h-min"
                  href="https://github.com"
               >
                  <FaGithub />
               </Link>
               <Link
                  className="text-white/90 hover:text-white h-min"
                  href="https://twitter.com"
               >
                  <FaTwitter />
               </Link>
            </div>
         </div>
      </nav>
   );
}
